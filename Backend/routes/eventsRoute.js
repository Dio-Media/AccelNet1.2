const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM anevents ORDER BY start_datetime DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM anevents WHERE event_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, slug, summary, event_description, event_type, start_datetime, end_datetime, location, city, country, registration_url, is_virtual } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO anevents (title, slug, summary, event_description, event_type, start_datetime, end_datetime, location, city, country, registration_url, is_virtual) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [title, slug, summary, event_description, event_type, start_datetime, end_datetime, location, city, country, registration_url, is_virtual]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { title, summary, event_description, event_type, start_datetime, end_datetime, location, registration_url, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE anevents SET title = $1, summary = $2, event_description = $3, event_type = $4, start_datetime = $5, end_datetime = $6, location = $7, registration_url = $8, status = $9 WHERE event_id = $10 RETURNING *',
            [title, summary, event_description, event_type, start_datetime, end_datetime, location, registration_url, status, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM anevents WHERE event_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;