const mongoose = require('mongoose');

const ObsSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    coordinates: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Obs = mongoose.model('Obs', ObsSchema);

module.exports = Obs;