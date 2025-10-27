const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all datasets
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM datasets ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get dataset by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM datasets WHERE dataset_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dataset not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create dataset
router.post('/', async (req, res) => {
    const { name, description, indexed_type, das, file_size_gb, created_by } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO datasets (name, description, indexed_type, das, file_size_gb, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, indexed_type, das, file_size_gb, created_by]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update dataset
router.put('/:id', async (req, res) => {
    const { name, description, das } = req.body;
    try {
        const result = await pool.query(
            'UPDATE datasets SET name = $1, description = $2, das = $3 WHERE dataset_id = $4 RETURNING *',
            [name, description, das, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dataset not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete dataset
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM datasets WHERE dataset_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dataset not found' });
        }
        res.json({ message: 'Dataset deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;