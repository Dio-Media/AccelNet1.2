const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all affiliations
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ua.*, u.first_name, u.last_name, o.org_name
            FROM user_affiliations ua
            JOIN users u ON ua.user_id = u.user_id
            JOIN organizations o ON ua.org_id = o.org_id
            ORDER BY ua.is_current DESC, ua.start_date DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get affiliations for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ua.*, o.org_name, o.logo_url
            FROM user_affiliations ua
            JOIN organizations o ON ua.org_id = o.org_id
            WHERE ua.user_id = $1
            ORDER BY ua.is_current DESC, ua.start_date DESC
        `, [req.params.userId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get affiliations for an organization
router.get('/organization/:orgId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ua.*, u.first_name, u.last_name, u.email
            FROM user_affiliations ua
            JOIN users u ON ua.user_id = u.user_id
            WHERE ua.org_id = $1
            ORDER BY ua.is_current DESC, ua.start_date DESC
        `, [req.params.orgId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create affiliation
router.post('/', async (req, res) => {
    const { user_id, org_id, job_title, start_date, end_date, is_current } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO user_affiliations (user_id, org_id, job_title, start_date, end_date, is_current) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, org_id, job_title, start_date, end_date, is_current]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update affiliation
router.put('/:id', async (req, res) => {
    const { job_title, end_date, is_current } = req.body;
    try {
        const result = await pool.query(
            'UPDATE user_affiliations SET job_title = $1, end_date = $2, is_current = $3 WHERE aff_id = $4 RETURNING *',
            [job_title, end_date, is_current, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Affiliation not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete affiliation
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM user_affiliations WHERE aff_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Affiliation not found' });
        }
        res.json({ message: 'Affiliation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;