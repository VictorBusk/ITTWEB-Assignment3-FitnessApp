import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from './user';
import {environment} from '../environments/environment';

@Injectable()
export class UsersService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiBaseUrl = environment.apiUrl;

  constructor(private http: Http) {
  }

  getUsers(): Promise<User[]> {
    const url = `${this.apiBaseUrl}/users`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  create(name: string): Promise<User> {
    return this.http
      .post(`${this.apiBaseUrl}/users`, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }

  update(userId: string, name: string): Promise<User> {
    return this.http
      .put(`${this.apiBaseUrl}/users/${userId}`, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }

  remove(userId: string): Promise<void> {
    const url = `${this.apiBaseUrl}/users/${userId}`;
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
