import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';

import { AppComponent }       from './app.component';
import { UserComponent }      from './user/user.component';
import { UsersService }       from './users.service';
import { WorkoutComponent }   from './workout/workout.component';
import { WorkoutsService }    from './workouts.service';
import { ExerciseComponent }  from './exercise/exercise.component';
import { ExercisesService }   from './exercises.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    UserComponent,
    WorkoutComponent,
    ExerciseComponent
  ],
  providers: [
    UsersService,
    WorkoutsService,
    ExercisesService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
