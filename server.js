const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Set up SQLite database
const db = new sqlite3.Database('posts.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to SQLite database.');
});

// Create posts table
db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TEXT NOT NULL
)`);

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('.')); // Serve index.html, script.js, style.css

// API to save a post
app.post('/api/posts', (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).json({ error: 'Username and message required' });
    }
    const timestamp = new Date().toISOString();
    db.run(`INSERT INTO posts (username, message, timestamp) VALUES (?, ?, ?)`,
        [username, message, timestamp], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        });
});

// API to fetch all posts
app.get('/api/posts', (req, res) => {
    db.all(`SELECT * FROM posts ORDER BY timestamp DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});