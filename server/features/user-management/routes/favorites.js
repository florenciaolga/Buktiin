const express = require('express');
const router = express.Router();
const db = require('../../../config/db');
const verifyToken = require('../middleware/auth');

// GET user's favorites (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [favorites] = await db.query(`
      SELECT 
        f.id as favorite_id, f.created_at as favorited_at,
        u.id as worker_id, u.name, u.profile_image,
        wp.location, wp.base_price, wp.rating, wp.total_jobs,
        GROUP_CONCAT(s.name) as skills
      FROM favorites f
      INNER JOIN users u ON f.worker_id = u.id
      INNER JOIN worker_profiles wp ON u.id = wp.user_id
      LEFT JOIN worker_skills ws ON wp.id = ws.worker_profile_id
      LEFT JOIN skills s ON ws.skill_id = s.id
      WHERE f.user_id = ?
      GROUP BY f.id, f.created_at, u.id, u.name, u.profile_image, 
               wp.location, wp.base_price, wp.rating, wp.total_jobs
      ORDER BY f.created_at DESC
    `, [userId]);
    
    const formattedFavorites = favorites.map(f => ({
      ...f,
      skills: f.skills ? f.skills.split(',') : []
    }));
    
    res.json(formattedFavorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Failed to fetch favorites', error: error.message });
  }
});

// POST add to favorites (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { worker_id } = req.body;
    const user_id = req.user.id;
    
    if (!worker_id) {
      return res.status(400).json({ message: 'Worker ID is required' });
    }
    
    // Check if worker exists
    const [workers] = await db.query(
      'SELECT id FROM users WHERE id = ? AND is_worker = TRUE',
      [worker_id]
    );
    
    if (workers.length === 0) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    
    // Check if already favorited
    const [existing] = await db.query(
      'SELECT id FROM favorites WHERE user_id = ? AND worker_id = ?',
      [user_id, worker_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Worker already in favorites' });
    }
    
    await db.query(
      'INSERT INTO favorites (user_id, worker_id) VALUES (?, ?)',
      [user_id, worker_id]
    );
    
    res.status(201).json({ message: 'Added to favorites successfully' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Failed to add favorite', error: error.message });
  }
});

// DELETE remove from favorites (protected)
router.delete('/:workerId', verifyToken, async (req, res) => {
  try {
    const { workerId } = req.params;
    const userId = req.user.id;
    
    const [result] = await db.query(
      'DELETE FROM favorites WHERE user_id = ? AND worker_id = ?',
      [userId, workerId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json({ message: 'Removed from favorites successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Failed to remove favorite', error: error.message });
  }
});

// GET check if worker is favorited (protected)
router.get('/check/:workerId', verifyToken, async (req, res) => {
  try {
    const { workerId } = req.params;
    const userId = req.user.id;
    
    const [favorites] = await db.query(
      'SELECT id FROM favorites WHERE user_id = ? AND worker_id = ?',
      [userId, workerId]
    );
    
    res.json({ is_favorite: favorites.length > 0 });
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ message: 'Failed to check favorite', error: error.message });
  }
});

module.exports = router;