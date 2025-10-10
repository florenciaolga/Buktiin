const express = require('express');
const router = express.Router();
const db = require('../../../config/db');
const verifyToken = require('../middleware/auth');

// GET all conversations (protected)
router.get('/conversations', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [conversations] = await db.query(`
      SELECT DISTINCT
        CASE 
          WHEN m.sender_id = ? THEN m.receiver_id 
          ELSE m.sender_id 
        END as other_user_id,
        u.name as other_user_name,
        u.profile_image as other_user_image,
        (SELECT message FROM messages 
         WHERE (sender_id = ? AND receiver_id = other_user_id) 
            OR (sender_id = other_user_id AND receiver_id = ?)
         ORDER BY created_at DESC LIMIT 1) as last_message,
        (SELECT created_at FROM messages 
         WHERE (sender_id = ? AND receiver_id = other_user_id) 
            OR (sender_id = other_user_id AND receiver_id = ?)
         ORDER BY created_at DESC LIMIT 1) as last_message_time,
        (SELECT COUNT(*) FROM messages 
         WHERE sender_id = other_user_id AND receiver_id = ? AND is_read = FALSE) as unread_count
      FROM messages m
      INNER JOIN users u ON (
        CASE 
          WHEN m.sender_id = ? THEN m.receiver_id 
          ELSE m.sender_id 
        END = u.id
      )
      WHERE m.sender_id = ? OR m.receiver_id = ?
      ORDER BY last_message_time DESC
    `, [userId, userId, userId, userId, userId, userId, userId, userId, userId]);
    
    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Failed to fetch conversations', error: error.message });
  }
});

// GET messages with a specific user (protected)
router.get('/:otherUserId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    
    const [messages] = await db.query(`
      SELECT 
        m.id, m.message, m.sender_id, m.receiver_id, m.is_read, m.created_at,
        s.name as sender_name, s.profile_image as sender_image
      FROM messages m
      INNER JOIN users s ON m.sender_id = s.id
      WHERE (m.sender_id = ? AND m.receiver_id = ?)
         OR (m.sender_id = ? AND m.receiver_id = ?)
      ORDER BY m.created_at ASC
    `, [userId, otherUserId, otherUserId, userId]);
    
    // Mark messages as read
    await db.query(
      'UPDATE messages SET is_read = TRUE WHERE sender_id = ? AND receiver_id = ? AND is_read = FALSE',
      [otherUserId, userId]
    );
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

// POST send message (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { receiver_id, message } = req.body;
    const sender_id = req.user.id;
    
    if (!receiver_id || !message) {
      return res.status(400).json({ message: 'Receiver ID and message are required' });
    }
    
    // Verify receiver exists
    const [users] = await db.query('SELECT id FROM users WHERE id = ?', [receiver_id]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'Receiver not found' });
    }
    
    const [result] = await db.query(
      'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
      [sender_id, receiver_id, message]
    );
    
    res.status(201).json({
      message: 'Message sent successfully',
      message_id: result.insertId
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

// PUT mark message as read (protected)
router.put('/:id/read', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await db.query(
      'UPDATE messages SET is_read = TRUE WHERE id = ? AND receiver_id = ?',
      [id, userId]
    );
    
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ message: 'Failed to mark message as read', error: error.message });
  }
});

// GET unread message count (protected)
router.get('/unread/count', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [result] = await db.query(
      'SELECT COUNT(*) as unread_count FROM messages WHERE receiver_id = ? AND is_read = FALSE',
      [userId]
    );
    
    res.json({ unread_count: result[0].unread_count });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ message: 'Failed to fetch unread count', error: error.message });
  }
});

// DELETE message (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Only sender can delete
    const [messages] = await db.query(
      'SELECT id FROM messages WHERE id = ? AND sender_id = ?',
      [id, userId]
    );
    
    if (messages.length === 0) {
      return res.status(404).json({ message: 'Message not found or unauthorized' });
    }
    
    await db.query('DELETE FROM messages WHERE id = ?', [id]);
    
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
});

module.exports = router;