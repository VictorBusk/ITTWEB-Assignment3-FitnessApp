const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlWorkouts = require('../controllers/workouts');
const ctrlExercises = require('../controllers/exercises');

router.route('/users')
    .get(ctrlUsers.listAll)
    .post(ctrlUsers.create);

router.route('/users/:userId')
    .put(ctrlUsers.update)
    .delete(ctrlUsers.remove);

router.route('/users/:userId/workouts')
    .get(ctrlWorkouts.getByUserId)
    .post(ctrlWorkouts.create);

router.route('/users/:userId/workouts/:workoutId')
    .put(ctrlWorkouts.update)
    .delete(ctrlWorkouts.remove);

router.route('/users/:userId/workouts/:workoutId/exercises')
    .get(ctrlExercises.getByWorkoutId)
    .post(ctrlExercises.create);

router.route('/users/:userId/workouts/:workoutId/exercises/:exerciseId')
    .put(ctrlExercises.update)
    .delete(ctrlExercises.remove);

module.exports = router;
