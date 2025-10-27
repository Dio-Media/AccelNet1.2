const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get authors for a tool
router.get('/tool/:toolId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ta.*, u.first_name, u.last_name, u.email
            FROM tool_authors ta
            JOIN users u ON ta.user_id = u.user_id
            WHERE ta.tool_id = $1
        `, [req.params.toolId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get tools by author
router.get('/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ta.*, t.name, t.description, t.tool_type
            FROM tool_authors ta
            JOIN tools t ON ta.tool_id = t.tool_id
            WHERE ta.user_id = $1
        `, [req.params.userId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add author to tool
router.post('/', async (req, res) => {
    const { tool_id, user_id, contribution_role } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tool_authors (tool_id, user_id, contribution_role) VALUES ($1, $2, $3) RETURNING *',
            [tool_id, user_id, contribution_role]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove author from tool
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM tool_authors WHERE ta_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tool author not found' });
        }
        res.json({ message: 'Author removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;