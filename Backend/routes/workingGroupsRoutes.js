const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all working groups
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM working_groups ORDER BY wg_name');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get working group with members
router.get('/:id', async (req, res) => {
    try {
        const wg = await pool.query('SELECT * FROM working_groups WHERE wg_id = $1', [req.params.id]);
        if (wg.rows.length === 0) {
            return res.status(404).json({ error: 'Working group not found' });
        }
        
        const members = await pool.query(`
            SELECT wgm.*, u.first_name, u.last_name, u.email
            FROM working_group_members wgm
            JOIN users u ON wgm.user_id = u.user_id
            WHERE wgm.wg_id = $1 AND wgm.is_active = true
            ORDER BY wgm.join_date DESC
        `, [req.params.id]);
        
        res.json({
            ...wg.rows[0],
            members: members.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create working group
router.post('/', async (req, res) => {
    const { wg_name, wg_code, focus_area, wg_description, start_date, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO working_groups (wg_name, wg_code, focus_area, wg_description, start_date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [wg_name, wg_code, focus_area, wg_description, start_date, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add member to working group
router.post('/:id/members', async (req, res) => {
    const { user_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO working_group_members (wg_id, user_id, is_active) VALUES ($1, $2, true) RETURNING *',
            [req.params.id, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove member from working group
router.put('/:wgId/members/:memberId/deactivate', async (req, res) => {
    try {
        const result = await pool.query(
            'UPDATE working_group_members SET is_active = false, leave_date = CURRENT_DATE WHERE wg_id = $1 AND membership_id = $2 RETURNING *',
            [req.params.wgId, req.params.memberId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;