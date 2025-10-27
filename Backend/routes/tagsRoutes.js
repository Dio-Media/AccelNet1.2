const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all tags
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tags ORDER BY usage_count DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get tags by category
router.get('/category/:category', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tags WHERE category = $1 ORDER BY tag_name',
            [req.params.category]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get tags for specific content
router.get('/content/:contentType/:contentId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT t.*
            FROM tags t
            JOIN content_tags ct ON t.tag_id = ct.tag_id
            WHERE ct.content_type = $1 AND ct.content_id = $2
        `, [req.params.contentType, req.params.contentId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create tag
router.post('/', async (req, res) => {
    const { tag_name, category } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tags (tag_name, category) VALUES ($1, $2) RETURNING *',
            [tag_name, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tag content
router.post('/content', async (req, res) => {
    const { content_type, content_id, tag_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO content_tags (content_type, content_id, tag_id) VALUES ($1, $2, $3) RETURNING *',
            [content_type, content_id, tag_id]
        );
        
        // Update usage count
        await pool.query('UPDATE tags SET usage_count = usage_count + 1 WHERE tag_id = $1', [tag_id]);
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove tag from content
router.delete('/content/:ctId', async (req, res) => {
    try {
        const tag = await pool.query('SELECT tag_id FROM content_tags WHERE ct_id = $1', [req.params.ctId]);
        
        const result = await pool.query('DELETE FROM content_tags WHERE ct_id = $1 RETURNING *', [req.params.ctId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Content tag not found' });
        }
        
        // Update usage count
        if (tag.rows.length > 0) {
            await pool.query('UPDATE tags SET usage_count = usage_count - 1 WHERE tag_id = $1', [tag.rows[0].tag_id]);
        }
        
        res.json({ message: 'Tag removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;