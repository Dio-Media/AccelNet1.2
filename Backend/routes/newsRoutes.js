const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/news - Get all news articles
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/news/:id - Get single news article
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news WHERE news_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'News article not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/news - Create news article
router.post('/', async (req, res) => {
    const { title, slug, content, excerpt, category, author_id, featured_image_url } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO news (title, slug, content, excerpt, category, author_id, featured_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, slug, content, excerpt, category, author_id, featured_image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/news/:id - Update news article
router.put('/:id', async (req, res) => {
    const { title, slug, content, excerpt, category, featured_image_url } = req.body;
    try {
        const result = await pool.query(
            'UPDATE news SET title = $1, slug = $2, content = $3, excerpt = $4, category = $5, featured_image_url = $6, updated_at = CURRENT_TIMESTAMP WHERE news_id = $7 RETURNING *',
            [title, slug, content, excerpt, category, featured_image_url, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'News article not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/news/:id - Delete news article
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM news WHERE news_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'News article not found' });
        }
        res.json({ message: 'News article deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;