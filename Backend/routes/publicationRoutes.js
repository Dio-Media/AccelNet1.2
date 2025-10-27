const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all publications
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM publications ORDER BY publication_date DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get publication by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM publications WHERE publication_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Publication not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get publications by type
router.get('/type/:publicationType', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM publications WHERE publication_type = $1 ORDER BY publication_date DESC',
            [req.params.publicationType]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create publication
router.post('/', async (req, res) => {
    const { title, publication_type, journal_name, publication_date, doi, url, abstract, pmid, citation_count, keywords } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO publications (title, publication_type, journal_name, publication_date, doi, url, abstract, pmid, citation_count, keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [title, publication_type, journal_name, publication_date, doi, url, abstract, pmid, citation_count, keywords]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update publication
router.put('/:id', async (req, res) => {
    const { title, journal_name, publication_date, doi, url, abstract, citation_count } = req.body;
    try {
        const result = await pool.query(
            'UPDATE publications SET title = $1, journal_name = $2, publication_date = $3, doi = $4, url = $5, abstract = $6, citation_count = $7, updated_at = CURRENT_TIMESTAMP WHERE publication_id = $8 RETURNING *',
            [title, journal_name, publication_date, doi, url, abstract, citation_count, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Publication not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete publication
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM publications WHERE publication_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Publication not found' });
        }
        res.json({ message: 'Publication deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
