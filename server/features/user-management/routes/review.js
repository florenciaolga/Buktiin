const express = require('express');
const router = express.Router();
const db = require('../../../config/db');
const verifyToken = require('../middleware/auth');

// POST create review (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { job_id, rating, comment } = req.body;
    const customer_id = req.user.id;
    
    // Verify job exists and is completed
    const [jobs] = await db.query(
      'SELECT worker_id FROM jobs WHERE id = ? AND customer_id = ? AND status = "completed"',
      [job_id, customer_id]
    );
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found, unauthorized, or not completed' });
    }
    
    const worker_id = jobs[0].worker_id;
    
    // Check if review already exists
    const [existing] = await db.query(
      'SELECT id FROM reviews WHERE job_id = ?',
      [job_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Review already exists for this job' });
    }
    
    // Insert review
    await db.query(
      'INSERT INTO reviews (job_id, customer_id, worker_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [job_id, customer_id, worker_id, rating, comment]
    );
    
    // Update worker's average rating
    const [avgRating] = await db.query(
      'SELECT AVG(rating) as avg_rating FROM reviews WHERE worker_id = ?',
      [worker_id]
    );
    
    const newRating = parseFloat(avgRating[0].avg_rating).toFixed(1);
    
    await db.query(`
      UPDATE worker_profiles wp
      SET wp.rating = ?
      WHERE wp.user_id = ?
    `, [newRating, worker_id]);
    
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Failed to fetch review', error: error.message });
  }
});

// PUT update review (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const customer_id = req.user.id;
    
    // Verify ownership
    const [reviews] = await db.query(
      'SELECT worker_id FROM reviews WHERE id = ? AND customer_id = ?',
      [id, customer_id]
    );
    
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }
    
    await db.query(
      'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
      [rating, comment, id]
    );
    
    // Recalculate worker's average rating
    const worker_id = reviews[0].worker_id;
    const [avgRating] = await db.query(
      'SELECT AVG(rating) as avg_rating FROM reviews WHERE worker_id = ?',
      [worker_id]
    );
    
    const newRating = parseFloat(avgRating[0].avg_rating).toFixed(1);
    
    await db.query(`
      UPDATE worker_profiles wp
      SET wp.rating = ?
      WHERE wp.user_id = ?
    `, [newRating, worker_id]);
    
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Failed to update review', error: error.message });
  }
});

// DELETE review (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const customer_id = req.user.id;
    
    const [reviews] = await db.query(
      'SELECT worker_id FROM reviews WHERE id = ? AND customer_id = ?',
      [id, customer_id]
    );
    
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }
    
    const worker_id = reviews[0].worker_id;
    
    await db.query('DELETE FROM reviews WHERE id = ?', [id]);
    
    // Recalculate worker's average rating
    const [avgRating] = await db.query(
      'SELECT AVG(rating) as avg_rating FROM reviews WHERE worker_id = ?',
      [worker_id]
    );
    
    const newRating = avgRating[0].avg_rating ? parseFloat(avgRating[0].avg_rating).toFixed(1) : 0;
    
    await db.query(`
      UPDATE worker_profiles wp
      SET wp.rating = ?
      WHERE wp.user_id = ?
    `, [newRating, worker_id]);
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
});

module.exports = router;) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
});

// GET reviews for a worker
router.get('/worker/:workerId', async (req, res) => {
  try {
    const { workerId } = req.params;
    
    const [reviews] = await db.query(`
      SELECT 
        r.id, r.rating, r.comment, r.created_at,
        u.name as customer_name, u.profile_image as customer_image,
        j.title as job_title
      FROM reviews r
      INNER JOIN users u ON r.customer_id = u.id
      INNER JOIN jobs j ON r.job_id = j.id
      WHERE r.worker_id = ?
      ORDER BY r.created_at DESC
    `, [workerId]);
    
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
});

// GET review by job ID (protected)
router.get('/job/:jobId', verifyToken, async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;
    
    const [reviews] = await db.query(`
      SELECT r.*, u.name as customer_name
      FROM reviews r
      INNER JOIN users u ON r.customer_id = u.id
      INNER JOIN jobs j ON r.job_id = j.id
      WHERE r.job_id = ? AND (j.customer_id = ? OR j.worker_id = ?)
    `, [jobId, userId, userId]);
    
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(reviews[0]);
  } catch (error