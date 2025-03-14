const mongoose = require('mongoose');
const trackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
    duration: { type: Number, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }
});
module.exports = mongoose.model('Track', trackSchema);