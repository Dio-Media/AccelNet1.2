const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ui.*, u.first_name, u.last_name
            FROM user_interactions ui
            JOIN users u ON ui.user_id = u.user_id
            ORDER BY ui.interaction_date DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM user_interactions WHERE user_id = $1 ORDER BY interaction_date DESC',
            [req.params.userId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/content/:contentType/:contentId', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT ui.*, u.first_name, u.last_name FROM user_interactions ui JOIN users u ON ui.user_id = u.user_id WHERE ui.content_type = $1 AND ui.content_id = $2 ORDER BY ui.interaction_date DESC',
            [req.params.contentType, req.params.contentId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { user_id, content_type, content_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO user_interactions (user_id, content_type, content_id) VALUES ($1, $2, $3) RETURNING *',
            [user_id, content_type, content_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;