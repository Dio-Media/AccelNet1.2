const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all audit logs (with pagination)
router.get('/', async (req, res) => {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    
    try {
        const result = await pool.query(`
            SELECT al.*, u.first_name, u.last_name
            FROM audit_logs al
            LEFT JOIN users u ON al.user_id = u.user_id
            ORDER BY al.created_at DESC
            LIMIT $1 OFFSET $2
        `, [limit, offset]);
        
        const countResult = await pool.query('SELECT COUNT(*) FROM audit_logs');
        
        res.json({
            logs: result.rows,
            total: parseInt(countResult.rows[0].count),
            page: parseInt(page),
            totalPages: Math.ceil(countResult.rows[0].count / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get audit logs by user
router.get('/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM audit_logs WHERE user_id = $1 ORDER BY created_at DESC',
            [req.params.userId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get audit logs by table
router.get('/table/:tableName', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT al.*, u.first_name, u.last_name FROM audit_logs al LEFT JOIN users u ON al.user_id = u.user_id WHERE al.table_name = $1 ORDER BY al.created_at DESC',
            [req.params.tableName]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get audit logs for specific record
router.get('/record/:tableName/:recordId', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT al.*, u.first_name, u.last_name FROM audit_logs al LEFT JOIN users u ON al.user_id = u.user_id WHERE al.table_name = $1 AND al.record_id = $2 ORDER BY al.created_at DESC',
            [req.params.tableName, req.params.recordId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
