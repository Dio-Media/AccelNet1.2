const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ga.*, u.first_name, u.last_name, u.email
            FROM grants_applications ga
            JOIN users u ON ga.user_id = u.user_id
            ORDER BY ga.application_date DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM grants_applications WHERE user_id = $1 ORDER BY application_date DESC',
            [req.params.userId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { grant_id, user_id, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO grants_applications (grant_id, user_id, status) VALUES ($1, $2, $3) RETURNING *',
            [grant_id, user_id, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE grants_applications SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE application_id = $2 RETURNING *',
            [status, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;