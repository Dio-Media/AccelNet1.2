const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY last_name, first_name');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json({ message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { email, title, first_name, last_name, linkedin_handle, profile_image_url, bio, roles, created_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (email, title, first_name, last_name, linkedin_handle, profile_image_url, bio, roles, created_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [email, title, first_name, last_name, linkedin_handle, profile_image_url, bio, roles, created_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { email, title, first_name, last_name, linkedin_handle, profile_image_url, bio } = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET email = $1, title = $2, first_name = $3, last_name = $4, linkedin_handle = $5, profile_image_url = $6, bio = $7 WHERE user_id = $8 RETURNING *',
            [email, title, first_name, last_name, linkedin_handle, profile_image_url, bio, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;