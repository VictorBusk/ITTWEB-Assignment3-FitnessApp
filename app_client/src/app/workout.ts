import {Exercise} from './exercise';

export class Workout {
  _id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}
