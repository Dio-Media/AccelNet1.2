const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all committees
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM committees ORDER BY committee_name');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get committee with members
router.get('/:id', async (req, res) => {
    try {
        const committee = await pool.query('SELECT * FROM committees WHERE committee_id = $1', [req.params.id]);
        if (committee.rows.length === 0) {
            return res.status(404).json({ error: 'Committee not found' });
        }
        
        const members = await pool.query(`
            SELECT cm.*, u.first_name, u.last_name, u.email
            FROM committee_members cm
            JOIN users u ON cm.user_id = u.user_id
            WHERE cm.committee_id = $1
        `, [req.params.id]);
        
        res.json({
            ...committee.rows[0],
            members: members.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create committee
router.post('/', async (req, res) => {
    const { committee_name, type, expertise, committee_description, is_active } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO committees (committee_name, type, expertise, committee_description, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [committee_name, type, expertise, committee_description, is_active]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add member to committee
router.post('/:id/members', async (req, res) => {
    const { user_id, committee_position, is_chair } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO committee_members (committee_id, user_id, committee_position, is_chair) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.params.id, user_id, committee_position, is_chair]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove member from committee
router.delete('/:committeeId/members/:memberId', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM committee_members WHERE committee_id = $1 AND member_id = $2 RETURNING *',
            [req.params.committeeId, req.params.memberId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Member not found in committee' });
        }
        res.json({ message: 'Member removed from committee successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;