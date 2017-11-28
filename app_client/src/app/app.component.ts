import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UsersService} from './users.service';
import {Workout} from './workout';
import {WorkoutsService} from './workouts.service';
import {Exercise} from './exercise';
import {ExercisesService} from './exercises.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[];
  selectedUser: User;
  editUser: User;
  newUser: boolean;

  workouts: Workout[];
  selectedWorkout: Workout;
  editWorkout: Workout;
  newWorkout: boolean;


  exercises: Exercise[];
  selectedExercise: Exercise;
  editExercise: Exercise;
  newExercise: boolean;


  constructor(
    private userService: UsersService,
    private workoutService: WorkoutsService,
    private exerciseService: ExercisesService
  ) { }

  getUsers(): void {
    this.userService
      .getUsers()
      .then(users => {
        this.users = users;
        this.selectedUser = null;
        this.selectedWorkout = null;
        this.selectedExercise = null;
        this.newUser = false;
        this.newWorkout = false;
        this.newExercise = false;
      });
  }

  addUser(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.create(name)
      .then(() => this.getUsers());
  }

  saveUser(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.update(this.editUser._id, name)
      .then(() => this.getUsers());
  }

  removeUser(user: User): void {
    this.userService
      .remove(user._id)
      .then(() => this.getUsers());
  }

  onSelectUser(user: User): void {
    this.selectedUser = user;
    this.getWorkouts();
  }

  onNewUser(): void {
    this.newUser = !this.newUser;
  }

  onEditUser(user: User): void {
    this.editUser = user;
  }

  getWorkouts(): void {
    this.workoutService
      .getWorkouts(this.selectedUser._id)
      .then(workouts => {
        this.workouts = workouts;
        this.selectedWorkout = null;
        this.selectedExercise = null;
        this.newUser = false;
        this.newWorkout = false;
        this.newExercise = false;
      });
  }

  addWorkout(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name) { return; }
    if (!description) { return; }
    this.workoutService.create(this.selectedUser._id, name, description)
      .then(() => this.getWorkouts());
  }

  saveWorkout(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name) { return; }
    if (!description) { return; }
    this.workoutService.update(this.selectedUser._id, this.editWorkout._id, name, description)
      .then(() => this.getWorkouts());
  }

  removeWorkout(workout: Workout): void {
    this.workoutService
      .remove(this.selectedUser._id, workout._id)
      .then(() => this.getWorkouts());
  }

  onSelectWorkout(workout: Workout): void {
    this.selectedWorkout = workout;
    this.getExercises();
  }

  onNewWorkout(): void {
    this.newWorkout = !this.newWorkout;
  }

  onEditWorkout(workout: Workout): void {
    this.editWorkout = workout;
  }

  getExercises(): void {
    this.exerciseService
      .getExercises(this.selectedUser._id, this.selectedWorkout._id)
      .then(exercises => {
        this.exercises = exercises;
        this.selectedExercise = null;
        this.newUser = false;
        this.newWorkout = false;
        this.newExercise = false;
      });
  }

  addExercise(name: string, description: string, sets: number, reps_time: string): void {
    name = name.trim();
    description = description.trim();
    reps_time = reps_time.trim();
    if (!name) {return;}
    if (!description) {return;}
    if (!sets) {return;}
    if (!reps_time) {return;}
    this.exerciseService.create(this.selectedUser._id, this.selectedWorkout._id, name, description, sets, reps_time)
      .then(() => this.getExercises());
  }

  saveExercise(name: string, description: string, sets: number, reps_time: string): void {
    name = name.trim();
    description = description.trim();
    reps_time = reps_time.trim();
    if (!name) {return;}
    if (!description) {return;}
    if (!sets) {return;}
    if (!reps_time) {return;}
    this.exerciseService.update(this.selectedUser._id, this.selectedWorkout._id, this.editExercise._id, name, description, sets, reps_time)
      .then(() => this.getExercises());
  }

  removeExercise(exercise: Exercise): void {
    this.exerciseService
      .remove(this.selectedUser._id, this.selectedWorkout._id, exercise._id)
      .then(() => this.getExercises());
  }

  onSelectExercise(exercise: Exercise): void {
    this.selectedExercise = exercise;
  }

  onNewExercise(): void {
    this.newExercise = !this.newExercise;
  }

  onEditExercise(exercise: Exercise): void {
    this.editExercise = exercise;
  }

  ngOnInit(): void {
    this.getUsers();
    this.newUser = true;
    this.newExercise = false;
    this.newExercise = false;
  }

}
