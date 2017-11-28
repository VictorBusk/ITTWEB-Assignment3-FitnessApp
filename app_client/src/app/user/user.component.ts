import { Component, OnInit }  from '@angular/core';

import { User }               from '../user';
import { UsersService }       from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  selectedUser: User;
  editUser: User;

  constructor(
    private userService: UsersService
  ) { }

  getUsers(): void {
    this.userService
      .getUsers()
      .then(users => this.users = users);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.create(name)
      .then(() => this.getUsers());
  }

  save(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.update(this.editUser._id, name)
      .then(() => this.getUsers());
  }

  remove(user: User): void {
    this.userService
      .remove(user._id)
      .then(() => this.getUsers());
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  onEdit(user: User): void {
    this.editUser = user;
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
