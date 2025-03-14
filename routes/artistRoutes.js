const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const { verifyToken } = require('../middleware/auth');

// Create a new artist
router.post('/', verifyToken, async (req, res) => {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).send(artist);
});

// Get all artists
router.get('/', verifyToken, async (req, res) => {
    const artists = await Artist.find().populate('albums');
    res.send(artists);
});

// Update an artist
router.put('/:id', verifyToken, async (req, res) => {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(artist);
});

// Delete an artist
router.delete('/:id', verifyToken, async (req, res) => {
    await Artist.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;