const express = require('express');
const cors = require('cors');
const compression = require('compression'); // optional: speeds up downloads
const app = express();

// Use environment port if available (for hosting platforms)
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(compression());               // optional but recommended
app.use(express.static('public'));    // serve frontend
app.use(express.raw({ limit: '50mb', type: '*/*' })); // handle uploads

// ===== ROUTES =====
// Serve main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ping endpoint
app.get('/ping', (req, res) => res.sendStatus(200));

// Download endpoint (10MB dummy data)
app.get('/download', (req, res) => {
    const size = 10 * 1024 * 1024; // 10MB
    const buffer = Buffer.alloc(size, 'a'); // fill with dummy data
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(buffer);
});

// Upload endpoint (dummy, do not store)
app.post('/upload', (req, res) => {
    res.sendStatus(200);
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
