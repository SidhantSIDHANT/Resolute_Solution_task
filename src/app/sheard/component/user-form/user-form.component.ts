import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  user!: User;
  id!: number;
  updatedUser!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService // private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get userFormControls() {
    return this.userForm.controls;
  }

  generateUUID(): any {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formValue = this.userForm.value;
    this.user = {
      id: this.userId || this.generateUUID(),
      name: formValue.name,
      email: formValue.email,
      role: formValue.role,
    };

    if (!this.isEditMode) {
      this.userService.addUser(this.user);
    }
    this.userForm.reset();
  }

  editUser(user: User) {
    this.isEditMode = true;
    if (user) {
      this.userForm.patchValue({ ...user });
      this.userService.editUser(this.userForm.value);
      localStorage.setItem('edit-user', JSON.stringify(user));
    }
  }

  updateUser(): void {
    if (localStorage.getItem('edit-user')) {
      this.id = JSON.parse(localStorage.getItem('edit-user')!).id;
      localStorage.removeItem('edit-user');
      this.updatedUser = { ...this.userForm.value, id: this.id };
      this.userService.updateUser(this.updatedUser);
      this.userForm.reset();
      this.isEditMode = false;
    }
  }
}
