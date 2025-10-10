const express = require('express');
const router = express.Router();
const db = require('../../../config/db');
const verifyToken = require('../middleware/auth');

// GET all workers with filters
router.get('/', async (req, res) => {
  try {
    const { category, location, gender, search } = req.query;
    
    let query = `
      SELECT 
        u.id, u.name, u.profile_image,
        wp.location, wp.base_price, wp.rating, wp.total_jobs,
        GROUP_CONCAT(s.name) as skills
      FROM users u
      INNER JOIN worker_profiles wp ON u.id = wp.user_id
      LEFT JOIN worker_skills ws ON wp.id = ws.worker_profile_id
      LEFT JOIN skills s ON ws.skill_id = s.id
      WHERE u.is_worker = TRUE
    `;
    
    const params = [];
    
    if (category) {
      query += ' AND s.name = ?';
      params.push(category);
    }
    
    if (location) {
      query += ' AND wp.location LIKE ?';
      params.push(`%${location}%`);
    }
    
    if (search) {
      query += ' AND (u.name LIKE ? OR s.name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    query += ' GROUP BY u.id, u.name, u.profile_image, wp.location, wp.base_price, wp.rating, wp.total_jobs';
    
    const [workers] = await db.query(query, params);
    
    // Parse skills from comma-separated string to array
    const formattedWorkers = workers.map(w => ({
      ...w,
      skills: w.skills ? w.skills.split(',') : []
    }));
    
    res.json(formattedWorkers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Failed to fetch workers', error: error.message });
  }
});

// GET worker profile by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [workers] = await db.query(`
      SELECT 
        u.id, u.name, u.email, u.phone, u.profile_image,
        wp.location, wp.base_price, wp.description, wp.rating, wp.total_jobs,
        GROUP_CONCAT(DISTINCT s.name) as skills
      FROM users u
      INNER JOIN worker_profiles wp ON u.id = wp.user_id
      LEFT JOIN worker_skills ws ON wp.id = ws.worker_profile_id
      LEFT JOIN skills s ON ws.skill_id = s.id
      WHERE u.id = ? AND u.is_worker = TRUE
      GROUP BY u.id, u.name, u.email, u.phone, u.profile_image, 
               wp.location, wp.base_price, wp.description, wp.rating, wp.total_jobs
    `, [id]);
    
    if (workers.length === 0) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    
    // Get portfolio images
    const [portfolio] = await db.query(`
      SELECT p.id, p.image_url, p.title, p.description
      FROM portfolio p
      INNER JOIN worker_profiles wp ON p.worker_profile_id = wp.id
      WHERE wp.user_id = ?
      ORDER BY p.created_at DESC
    `, [id]);
    
    const worker = {
      ...workers[0],
      skills: workers[0].skills ? workers[0].skills.split(',') : [],
      portfolio
    };
    
    res.json(worker);
  } catch (error) {
    console.error('Error fetching worker:', error);
    res.status(500).json({ message: 'Failed to fetch worker', error: error.message });
  }
});

// POST create/update worker profile (protected)
router.post('/profile', verifyToken, async (req, res) => {
  try {
    const { location, base_price, description, skills } = req.body;
    const userId = req.user.id;
    
    // Update user as worker
    await db.query('UPDATE users SET is_worker = TRUE WHERE id = ?', [userId]);
    
    // Check if worker profile exists
    const [existing] = await db.query(
      'SELECT id FROM worker_profiles WHERE user_id = ?',
      [userId]
    );
    
    let workerProfileId;
    
    if (existing.length > 0) {
      // Update existing profile
      await db.query(
        'UPDATE worker_profiles SET location = ?, base_price = ?, description = ? WHERE user_id = ?',
        [location, base_price, description, userId]
      );
      workerProfileId = existing[0].id;
    } else {
      // Create new profile
      const [result] = await db.query(
        'INSERT INTO worker_profiles (user_id, location, base_price, description) VALUES (?, ?, ?, ?)',
        [userId, location, base_price, description]
      );
      workerProfileId = result.insertId;
    }
    
    // Update skills if provided
    if (skills && Array.isArray(skills)) {
      // Delete existing skills
      await db.query('DELETE FROM worker_skills WHERE worker_profile_id = ?', [workerProfileId]);
      
      // Insert new skills
      for (const skillName of skills) {
        // Get or create skill
        let [skill] = await db.query('SELECT id FROM skills WHERE name = ?', [skillName]);
        
        if (skill.length === 0) {
          const [newSkill] = await db.query('INSERT INTO skills (name) VALUES (?)', [skillName]);
          skill = [{ id: newSkill.insertId }];
        }
        
        await db.query(
          'INSERT INTO worker_skills (worker_profile_id, skill_id) VALUES (?, ?)',
          [workerProfileId, skill[0].id]
        );
      }
    }
    
    res.json({ message: 'Worker profile updated successfully' });
  } catch (error) {
    console.error('Error updating worker profile:', error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// POST add portfolio item (protected)
router.post('/portfolio', verifyToken, async (req, res) => {
  try {
    const { image_url, title, description } = req.body;
    const userId = req.user.id;
    
    // Get worker profile id
    const [profile] = await db.query(
      'SELECT id FROM worker_profiles WHERE user_id = ?',
      [userId]
    );
    
    if (profile.length === 0) {
      return res.status(404).json({ message: 'Worker profile not found' });
    }
    
    await db.query(
      'INSERT INTO portfolio (worker_profile_id, image_url, title, description) VALUES (?, ?, ?, ?)',
      [profile[0].id, image_url, title, description]
    );
    
    res.json({ message: 'Portfolio item added successfully' });
  } catch (error) {
    console.error('Error adding portfolio:', error);
    res.status(500).json({ message: 'Failed to add portfolio', error: error.message });
  }
});

// DELETE portfolio item (protected)
router.delete('/portfolio/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Verify ownership
    const [portfolio] = await db.query(`
      SELECT p.id FROM portfolio p
      INNER JOIN worker_profiles wp ON p.worker_profile_id = wp.id
      WHERE p.id = ? AND wp.user_id = ?
    `, [id, userId]);
    
    if (portfolio.length === 0) {
      return res.status(404).json({ message: 'Portfolio item not found or unauthorized' });
    }
    
    await db.query('DELETE FROM portfolio WHERE id = ?', [id]);
    
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ message: 'Failed to delete portfolio', error: error.message });
  }
});

// GET all skills/categories
router.get('/categories/all', async (req, res) => {
  try {
    const [skills] = await db.query(`
      SELECT s.name, s.category, COUNT(ws.id) as worker_count
      FROM skills s
      LEFT JOIN worker_skills ws ON s.id = ws.skill_id
      GROUP BY s.id, s.name, s.category
      ORDER BY worker_count DESC
    `);
    
    res.json(skills);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
});

module.exports = router;