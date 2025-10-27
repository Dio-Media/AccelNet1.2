const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get organizers for an event
router.get('/event/:eventId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT eo.*, u.first_name, u.last_name, u.email
            FROM events_organizers eo
            JOIN users u ON eo.user_id = u.user_id
            WHERE eo.event_id = $1
        `, [req.params.eventId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get events organized by user
router.get('/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT eo.*, e.title, e.start_datetime, e.end_datetime, e.location
            FROM events_organizers eo
            JOIN anevents e ON eo.event_id = e.event_id
            WHERE eo.user_id = $1
            ORDER BY e.start_datetime DESC
        `, [req.params.userId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add organizer to event
router.post('/', async (req, res) => {
    const { event_id, user_id, organizer_role } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO events_organizers (event_id, user_id, organizer_role) VALUES ($1, $2, $3) RETURNING *',
            [event_id, user_id, organizer_role]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove organizer from event
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM events_organizers WHERE organizer_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        res.json({ message: 'Organizer removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;