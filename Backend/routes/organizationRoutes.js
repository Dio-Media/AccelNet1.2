const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM organizations ORDER BY org_name');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM organizations WHERE org_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { org_name, website_url, country, org_description, logo_url } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO organizations (org_name, website_url, country, org_description, logo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [org_name, website_url, country, org_description, logo_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { org_name, website_url, country, org_description, logo_url } = req.body;
    try {
        const result = await pool.query(
            'UPDATE organizations SET org_name = $1, website_url = $2, country = $3, org_description = $4, logo_url = $5, updated_at = CURRENT_TIMESTAMP WHERE org_id = $6 RETURNING *',
            [org_name, website_url, country, org_description, logo_url, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM organizations WHERE org_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;