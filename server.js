const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Initialize S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configure multer for file uploads to S3
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.S3_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path.extname(file.originalname));
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API endpoint for image uploads
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ imageUrl: req.file.location });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

// Store user nicknames
let nicknames = {};

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('a user connected');

    // Handle setting nickname
    socket.on('set nickname', (nickname) => {
        nicknames[socket.id] = nickname;
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', { nickname: nicknames[socket.id], message: msg });
    });

    socket.on('image message', (data) => {
        io.emit('image message', { nickname: nicknames[socket.id], imageUrl: data.imageUrl });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete nicknames[socket.id];
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});