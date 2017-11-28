import {Component, Input, OnInit}         from '@angular/core';

import { Workout }                        from '../workout';
import { WorkoutsService }                from '../workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  @Input() userId: string;
  workouts: Workout[];
  selectedWorkout: Workout;
  editWorkout: Workout;

  constructor(
    private workoutService: WorkoutsService
  ) { }

  getWorkouts(): void {
    this.workoutService
      .getWorkouts(this.userId)
      .then(foundWorkouts => this.workouts = foundWorkouts);
  }

  add(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name) {return;}
    if (!description) {return;}
    this.workoutService.create(this.userId, name, description)
      .then(() => this.getWorkouts());
  }

  save(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name) {return;}
    if (!description) {return;}
    this.workoutService.update(this.userId, this.editWorkout._id, name, description)
      .then(() => this.getWorkouts());
  }

  remove(workout: Workout): void {
    this.workoutService
      .remove(this.userId, workout._id)
      .then(() => this.getWorkouts());
  }

  onSelect(workout: Workout): void {
    this.selectedWorkout = workout;
  }

  onEdit(workout: Workout): void {
    this.editWorkout = workout;
  }

  ngOnInit(): void {
    this.getWorkouts();
  }
}
