const mongoose = require('mongoose');
const Workout = mongoose.model('Workout');
const Exercise = mongoose.model('Exercise');

const getByWorkoutId = function(req, res) {
    Workout.findById(req.params.workoutId)
        .populate('exercises')
        .exec((err, workout) => {
            if (!workout) {
                res.status(404)
                    .json({"message": "exercises not found"});
            } else if (err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(200)
                    .json(workout.exercises);
            }
        });
};

const create = function(req, res) {
    Exercise.create({
        name: req.body.name,
        description: req.body.description,
        sets: req.body.sets,
        reps_time: req.body.reps_time
    }, (err, exercise) => {
        console.log(exercise);
        Workout.findByIdAndUpdate(
            req.params.workoutId,
            {$push: {exercises: exercise}},
            {new: true},
            (err, workout) => {
                console.log(workout);
                if (err) {
                    res.status(400)
                        .json(err);
                } else {
                    res.status(201)
                        .json(exercise);
                }
            }
        );
    });
};

const update = function (req, res) {
    const exerciseId = req.params.exerciseId;
    Exercise.findById(exerciseId)
        .exec((err, exercise) => {
            if (!exercise) {
                res.status(404)
                    .json({"message": "exercise not found"});
                return;
            } else if (err) {
                res.status(404)
                    .json(err);
                return;
            }
            exercise.name = req.body.name;
            exercise.description = req.body.description;
            exercise.sets = req.body.sets;
            exercise.reps_time = req.body.reps_time;
            exercise.save((err, exercise) => {
                if (err) {
                    res.status(400)
                        .json(err);
                } else {
                    res.status(201)
                        .json(exercise);
                }
            });
        });
};

const remove = function (req, res) {
    const workoutId = req.params.workoutId;
    const exerciseId = req.params.exerciseId;
    Workout.findByIdAndUpdate(
        workoutId,
        {$pull: {exercises: exerciseId}},
        {new: true},
        (err, workout) => {
            if (err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(204)
                    .json(null);
            }
        }
    );
};

module.exports = {
    getByWorkoutId,
    create,
    update,
    remove
};
