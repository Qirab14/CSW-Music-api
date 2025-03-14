require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');

const { generateToken } = require('./middleware/auth');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Authentication route (for generating tokens)
app.post('/login', (req, res) => {
    // In a real application, you would validate the user credentials here
    const user = { _id: '12345' }; // Mock user
    const token = generateToken(user);
    res.send({ token });
});

// API routes
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/tracks', trackRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing