const mongoose = require('mongoose');
const User = mongoose.model('User');
const Workout = mongoose.model('Workout');

const getByUserId = function(req, res) {
    User.findById(req.params.userId)
        .populate('workouts')
        .exec((err, user) => {
            if (!user) {
                res.status(404)
                    .json({"message": "workouts not found"});
            } else if (err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(200)
                    .json(user.workouts);
            }
        });
};

const create = function(req, res) {
    Workout.create({
        name: req.body.name,
        description: req.body.description
    }, (err, workout) => {
        console.log(workout);
        User.findByIdAndUpdate(
            req.params.userId,
            {$push: {workouts: workout}},
            {new: true},
            (err, user) => {
                if (err) {
                    res.status(400)
                        .json(err);
                } else {
                    res.status(201)
                        .json(workout);
                }
            }
        );
    });
};

const update = function (req, res) {
    const workoutId = req.params.workoutId;
    Workout.findById(workoutId)
        .exec((err, workout) => {
            if (!workout) {
                res.status(404)
                    .json({"message": "workout not found"});
                return;
            } else if (err) {
                res.status(404)
                    .json(err);
                return;
            }
            workout.name = req.body.name;
            workout.description = req.body.description;
            workout.save((err, workout) => {
                if (err) {
                    res.status(400)
                        .json(err);
                } else {
                    res.status(201)
                        .json(workout);
                }
            });
        });
};

const remove = function (req, res) {
    const userId = req.params.userId;
    const workoutId = req.params.workoutId;
    User.findByIdAndUpdate(
        userId,
        {$pull: {workouts: workoutId}},
        {new: true},
        (err, user) => {
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
    getByUserId,
    create,
    update,
    remove
};
