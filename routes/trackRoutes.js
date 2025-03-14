const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const { verifyToken } = require('../middleware/auth');

// Create a new track
router.post('/', verifyToken, async (req, res) => {
    const track = new Track(req.body);
    await track.save();
    res.status(201).send(track);
});

// Get all tracks
router.get('/', verifyToken, async (req, res) => {
    const tracks = await Track.find().populate('album artist');
    res.send(tracks);
});

// Update a track
router.put('/:id', verifyToken, async (req, res) => {
    const track = await Track.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(track);
});

// Delete a track
router.delete('/:id', verifyToken, async (req, res) => {
    await Track.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;