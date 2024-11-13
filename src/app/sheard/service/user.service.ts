// src/app/user/user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor() {}

  getUsers() {
    return [...this.users];
  }

  addUser(user: User) {
    this.users.push(user);
    this.updateLocalStorage();
  }

  editUser(updatedUser: User) {
    this.users.forEach((element) => {
      if (element.id === updatedUser.id) {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        this.users[index] = updatedUser;
        this.updateLocalStorage();
      }
    });
  }

  updateUser(user : User): void{
      const index = this.users.findIndex(item => item.id === user.id);
      this.users[index] = user;
      this.updateLocalStorage();
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
