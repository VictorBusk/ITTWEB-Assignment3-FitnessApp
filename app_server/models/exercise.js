const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const exerciseSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps_time: {
        type: String,
        required: true
    },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);