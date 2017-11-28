import { Component, OnInit, Input }      from '@angular/core';

import { Exercise }               from '../exercise';
import { ExercisesService }       from '../exercises.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input() userId: string;
  @Input() workoutId: string;
  exercises: Exercise[];
  selectedExercise: Exercise;
  editExercise: Exercise;

  constructor(
    private exerciseService: ExercisesService
  ) { }

  getExercises(): void {
    this.exerciseService
      .getExercises(this.userId, this.workoutId)
      .then(foundExercises => this.exercises = foundExercises);
  }

  add(name: string, description: string, sets: number, reps_time: string): void {
    name = name.trim();
    description = description.trim();
    reps_time = reps_time.trim();
    if (!name) {return;}
    if (!description) {return;}
    if (!sets) {return;}
    if (!reps_time) {return;}
    this.exerciseService.create(this.userId, this.workoutId, name, description, sets, reps_time)
      .then(() => this.getExercises());
  }

  save(exercise: Exercise, name: string, description: string, sets: number, reps_time: string): void {
    name = name.trim();
    description = description.trim();
    reps_time = reps_time.trim();
    if (!name) {return;}
    if (!description) {return;}
    if (!sets) {return;}
    if (!reps_time) {return;}
    this.exerciseService.update(this.userId, this.workoutId, exercise._id, name, description, sets, reps_time)
      .then(() => this.getExercises());
  }

  remove(exercise: Exercise): void {
    this.exerciseService
      .remove(this.userId, this.workoutId, exercise._id)
      .then(() => this.getExercises());
  }

  onSelect(exercise: Exercise): void {
    this.selectedExercise = exercise;
  }

  onEdit(exercise: Exercise): void {
    this.editExercise = exercise;
  }

  ngOnInit(): void {
  }

}
