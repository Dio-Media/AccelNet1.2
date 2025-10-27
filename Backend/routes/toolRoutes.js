const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tools ORDER BY created_by DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tools WHERE tool_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tool not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, description, tool_type, repository_url, documentation_url, created_by } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tools (name, description, tool_type, repository_url, documentation_url, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, tool_type, repository_url, documentation_url, created_by]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { name, description, tool_type, repository_url, documentation_url } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tools SET name = $1, description = $2, tool_type = $3, repository_url = $4, documentation_url = $5 WHERE tool_id = $6 RETURNING *',
            [name, description, tool_type, repository_url, documentation_url, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tool not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM tools WHERE tool_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tool not found' });
        }
        res.json({ message: 'Tool deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;