const express = require('express');
const router = express.Router();
const ctrlIndex = require('../controllers/index');
const ctrlUsers = require('../controllers/users');
const ctrlWorkouts = require('../controllers/workouts');
const ctrlExercises = require('../controllers/exercises');

router.get('/', ctrlIndex.home);

router.get('/users', ctrlUsers.listAll);
router.post('/users/create', ctrlUsers.create);
router.get('/users/:id/remove', ctrlUsers.remove);

router.get('/users/:userId/workouts', ctrlWorkouts.getByUserId);
router.post('/users/:userId/workouts/create', ctrlWorkouts.create);
router.get('/users/:userId/workouts/:id/remove', ctrlWorkouts.remove);

router.get('/users/:userId/workouts/:workoutId/exercises', ctrlExercises.getByWorkoutId);
router.post('/users/:userId/workouts/:workoutId/exercises/create', ctrlExercises.create);
router.get('/users/:userId/workouts/:workoutId/exercises/:id/remove', ctrlExercises.remove);

module.exports = router;
