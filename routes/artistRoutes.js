const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const { verifyToken } = require('../middleware/auth');

// Create a new artist
router.post('/', verifyToken, async (req, res) => {
    const { name, genre } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
    }
    try {
        const artist = new Artist({ name, genre });
        await artist.save();
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Get all artists
router.get('/', verifyToken, async (req, res) => {
    try {
        const artists = await Artist.find().populate('albums');
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Get an artist by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found.' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Update an artist
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found.' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Delete an artist
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found.' });
        }
        res.status(200).json({ message: 'Artist deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

module.exports = router;
