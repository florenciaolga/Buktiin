const express = require('express');
const router = express.Router();
const db = require('../../../config/db');
const verifyToken = require('../middleware/auth');

// POST create new job/order (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      worker_id,
      title,
      description,
      location,
      service_fee,
      platform_fee,
      payment_method
    } = req.body;
    
    const customer_id = req.user.id;
    const total_amount = parseFloat(service_fee) + parseFloat(platform_fee);
    
    const [result] = await db.query(`
      INSERT INTO jobs (
        customer_id, worker_id, title, description, location,
        service_fee, platform_fee, total_amount, payment_method
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [customer_id, worker_id, title, description, location, service_fee, platform_fee, total_amount, payment_method]);
    
    res.status(201).json({
      message: 'Job created successfully',
      job_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
});

// GET user's jobs (as customer or worker) (protected)
router.get('/my-jobs', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { role } = req.query; // 'customer' or 'worker'
    
    let query = `
      SELECT 
        j.id, j.title, j.description, j.location, j.status,
        j.service_fee, j.platform_fee, j.total_amount,
        j.payment_method, j.payment_status,
        j.created_at, j.completed_at,
        u.name as other_party_name,
        u.profile_image as other_party_image
      FROM jobs j
    `;
    
    if (role === 'worker') {
      query += ' INNER JOIN users u ON j.customer_id = u.id WHERE j.worker_id = ?';
    } else {
      query += ' INNER JOIN users u ON j.worker_id = u.id WHERE j.customer_id = ?';
    }
    
    query += ' ORDER BY j.created_at DESC';
    
    const [jobs] = await db.query(query, [userId]);
    
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

// GET job details by ID (protected)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const [jobs] = await db.query(`
      SELECT 
        j.*,
        c.name as customer_name, c.email as customer_email, c.phone as customer_phone,
        w.name as worker_name, w.email as worker_email, w.phone as worker_phone,
        wp.location as worker_location, wp.rating as worker_rating
      FROM jobs j
      INNER JOIN users c ON j.customer_id = c.id
      INNER JOIN users w ON j.worker_id = w.id
      INNER JOIN worker_profiles wp ON w.id = wp.user_id
      WHERE j.id = ? AND (j.customer_id = ? OR j.worker_id = ?)
    `, [id, userId, userId]);
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }
    
    res.json(jobs[0]);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Failed to fetch job', error: error.message });
  }
});

// PUT update job status (protected)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    
    // Verify user is part of this job
    const [jobs] = await db.query(
      'SELECT * FROM jobs WHERE id = ? AND (customer_id = ? OR worker_id = ?)',
      [id, userId, userId]
    );
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }
    
    const updateData = { status };
    
    // If marking as completed, set completed_at
    if (status === 'completed') {
      updateData.completed_at = new Date();
      
      // Update worker's total jobs count
      await db.query(`
        UPDATE worker_profiles wp
        INNER JOIN jobs j ON wp.user_id = j.worker_id
        SET wp.total_jobs = wp.total_jobs + 1
        WHERE j.id = ?
      `, [id]);
    }
    
    await db.query(
      'UPDATE jobs SET status = ?, completed_at = ? WHERE id = ?',
      [status, updateData.completed_at || null, id]
    );
    
    res.json({ message: 'Job status updated successfully' });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ message: 'Failed to update job status', error: error.message });
  }
});

// PUT update payment status (protected)
router.put('/:id/payment', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_status } = req.body;
    const userId = req.user.id;
    
    // Verify user is the customer
    const [jobs] = await db.query(
      'SELECT * FROM jobs WHERE id = ? AND customer_id = ?',
      [id, userId]
    );
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }
    
    await db.query('UPDATE jobs SET payment_status = ? WHERE id = ?', [payment_status, id]);
    
    res.json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ message: 'Failed to update payment', error: error.message });
  }
});

// DELETE job (protected - only if pending)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const [jobs] = await db.query(
      'SELECT * FROM jobs WHERE id = ? AND customer_id = ? AND status = "pending"',
      [id, userId]
    );
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found, unauthorized, or cannot be deleted' });
    }
    
    await db.query('DELETE FROM jobs WHERE id = ?', [id]);
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Failed to delete job', error: error.message });
  }
});

module.exports = router;