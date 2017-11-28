import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Workout} from './workout';
import {environment} from '../environments/environment';


@Injectable()
export class WorkoutsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiBaseUrl = environment.apiUrl;

  constructor(private http: Http) {
  }

  getWorkouts(userId: string): Promise<Workout[]> {
    return this.http
      .get(`${this.apiBaseUrl}/users/${userId}/workouts`)
      .toPromise()
      .then(response => response.json() as Workout[])
      .catch(this.handleError);
  }

  create(userId: string, name: string, description: string): Promise<Workout> {
    return this.http
      .post(`${this.apiBaseUrl}/users/${userId}/workouts`, JSON.stringify({name: name, description: description}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Workout)
      .catch(this.handleError);
  }

  update(userId: string, workoutId: string, name: string, description: string): Promise<Workout> {
    return this.http
      .put(`${this.apiBaseUrl}/users/${userId}/workouts/${workoutId}`, JSON.stringify({name: name, description: description}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Workout)
      .catch(this.handleError);
  }

  remove(userId: string, workoutId: string): Promise<void> {
    const url = `${this.apiBaseUrl}/users/${userId}/workouts/${workoutId}`;
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
