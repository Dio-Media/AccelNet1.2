const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all multimedia
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM multimedia ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get multimedia by type
router.get('/type/:mediaType', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM multimedia WHERE media_type = $1 ORDER BY created_at DESC',
            [req.params.mediaType]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single multimedia
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM multimedia WHERE media_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Media not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Upload multimedia
router.post('/', async (req, res) => {
    const { title, description, media_type, file_url, thumbnail_url, file_size_gb, fluhr_album_id, uploaded_by } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO multimedia (title, description, media_type, file_url, thumbnail_url, file_size_gb, fluhr_album_id, uploaded_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [title, description, media_type, file_url, thumbnail_url, file_size_gb, fluhr_album_id, uploaded_by]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update multimedia
router.put('/:id', async (req, res) => {
    const { title, description, thumbnail_url } = req.body;
    try {
        const result = await pool.query(
            'UPDATE multimedia SET title = $1, description = $2, thumbnail_url = $3, updated_at = CURRENT_TIMESTAMP WHERE media_id = $4 RETURNING *',
            [title, description, thumbnail_url, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Media not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete multimedia
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM multimedia WHERE media_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Media not found' });
        }
        res.json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;