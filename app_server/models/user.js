const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }]
});

const User = mongoose.model('User', userSchema);