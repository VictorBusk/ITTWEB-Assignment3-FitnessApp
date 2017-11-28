import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Exercise} from './exercise';
import {environment} from '../environments/environment';


@Injectable()
export class ExercisesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiBaseUrl = environment.apiUrl;

  constructor(private http: Http) {
  }

  getExercises(userId: string, workoutId: string): Promise<Exercise[]> {
    return this.http
      .get(`${this.apiBaseUrl}/users/${userId}/workouts/${workoutId}/exercises`)
      .toPromise()
      .then(response => response.json() as Exercise[])
      .catch(this.handleError);
  }

  create(userId: string, workoutId: string, name: string, description: string, sets: number, reps_time: string): Promise<Exercise> {
    return this.http
      .post(`${this.apiBaseUrl}/users/${userId}/workouts/${workoutId}/exercises`, JSON.stringify({name: name, description: description, sets: sets, reps_time: reps_time}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Exercise)
      .catch(this.handleError);
  }

  update(userId: string, workoutId: string, exerciseId: string, name: string, description: string, sets: number, reps_time: string): Promise<Exercise> {
    return this.http
      .put(`${this.apiBaseUrl}/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`, JSON.stringify({name: name, description: description, sets: sets, reps_time: reps_time}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Exercise)
      .catch(this.handleError);
  }

  remove(userId: string, workoutId: string, exerciseId: string): Promise<void> {
    const url = `${this.apiBaseUrl}/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
