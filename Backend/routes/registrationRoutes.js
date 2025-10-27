const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all registrations
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT er.*, e.title as event_title, u.first_name, u.last_name, u.email
            FROM event_registration er
            JOIN anevents e ON er.event_id = e.event_id
            JOIN users u ON er.user_id = u.user_id
            ORDER BY er.registration_date DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get registrations for a specific event
router.get('/event/:eventId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT er.*, u.first_name, u.last_name, u.email
            FROM event_registration er
            JOIN users u ON er.user_id = u.user_id
            WHERE er.event_id = $1
            ORDER BY er.registration_date DESC
        `, [req.params.eventId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get registrations for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT er.*, e.title, e.start_datetime, e.end_datetime, e.location
            FROM event_registration er
            JOIN anevents e ON er.event_id = e.event_id
            WHERE er.user_id = $1
            ORDER BY e.start_datetime DESC
        `, [req.params.userId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register for an event
router.post('/', async (req, res) => {
    const { event_id, user_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO event_registration (event_id, user_id) VALUES ($1, $2) RETURNING *',
            [event_id, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update attendance status
router.put('/:id', async (req, res) => {
    const { attendance_status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE event_registration SET attendance_status = $1 WHERE registration_id = $2 RETURNING *',
            [attendance_status, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cancel registration
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM event_registration WHERE registration_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.json({ message: 'Registration cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
