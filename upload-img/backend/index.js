const path = require('path');
const express = require("express");
const cors = require("cors");
const crypto = require('crypto');
const router = require("./router");

const app = express();

// 1. CORS
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

// 2. POLYFILL
if (!global.crypto) {
    global.crypto = crypto;
}

// 3. MIDDLEWARE
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 4. STATIC FILES
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../public'))); 

// 5. API ROUTES
app.use('/api', router);

// 6. REACT CATCH-ALL
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// 7. EXPORT
// This allows db.js to take this 'app' and start it
module.exports = app;