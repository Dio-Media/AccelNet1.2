const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get media for a news article
router.get('/news/:newsId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT nm.*, m.*
            FROM news_media nm
            JOIN multimedia m ON nm.media_id = m.media_id
            WHERE nm.news_id = $1
            ORDER BY nm.display_order
        `, [req.params.newsId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add media to news article
router.post('/', async (req, res) => {
    const { news_id, media_id, display_order } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO news_media (news_id, media_id, display_order) VALUES ($1, $2, $3) RETURNING *',
            [news_id, media_id, display_order]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove media from news article
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM news_media WHERE nm_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'News media not found' });
        }
        res.json({ message: 'Media removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;