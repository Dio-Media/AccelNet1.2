const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all challenges
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT wgc.*, u.first_name, u.last_name, wg.wg_name
            FROM working_group_challenges wgc
            JOIN users u ON wgc.user_id = u.user_id
            JOIN working_groups wg ON wgc.wg_id = wg.wg_id
            ORDER BY wgc.start_date DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get challenges for a working group
router.get('/working-group/:wgId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT wgc.*, u.first_name, u.last_name
            FROM working_group_challenges wgc
            JOIN users u ON wgc.user_id = u.user_id
            WHERE wgc.wg_id = $1
            ORDER BY wgc.start_date DESC
        `, [req.params.wgId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get challenges for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT wgc.*, wg.wg_name
            FROM working_group_challenges wgc
            JOIN working_groups wg ON wgc.wg_id = wg.wg_id
            WHERE wgc.user_id = $1
            ORDER BY wgc.start_date DESC
        `, [req.params.userId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create challenge
router.post('/', async (req, res) => {
    const { user_id, wg_id, start_date, end_date, is_active } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO working_group_challenges (user_id, wg_id, start_date, end_date, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, wg_id, start_date, end_date, is_active]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update challenge status
router.put('/:id', async (req, res) => {
    const { is_active, end_date } = req.body;
    try {
        const result = await pool.query(
            'UPDATE working_group_challenges SET is_active = $1, end_date = $2 WHERE char_id = $3 RETURNING *',
            [is_active, end_date, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Challenge not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
