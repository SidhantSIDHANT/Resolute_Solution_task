import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnChanges, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions', 'edit'];
  dataSource: MatTableDataSource<User>;
  users: User[] = [];
  
  // For sorting
  sortBy: string = 'name';  // Default sorting by name
  sortDirection: string = 'asc'; // Default sorting direction

  @Input() user!: User;
  @Input('updatedUser') updatedUser!: User;
  @Output() editUserEvent: EventEmitter<User> = new EventEmitter<User>();

  // Access to paginator
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.dataSource.data = this.users;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      const updatedUser = changes['user'].currentValue;
      const index = this.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      } else {
        this.users.push(updatedUser);
      }
      this.dataSource.data = [...this.users];
    }

    if (changes['updatedUser'] && changes['updatedUser'].currentValue) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === this.updatedUser.id) {
          this.users[i].name = this.updatedUser.name;
          this.users[i].email = this.updatedUser.email;
          this.users[i].role = this.updatedUser.role;
          break;
        }
      }
      this.dataSource.data = [...this.users];
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applySort(event: any): void {
    this.sortBy = event.active;
    this.sortDirection = event.direction;
  }

  handlePageEvent(event: any): void {
    this.dataSource.paginator = event;
  }

  deleteUser(user: User): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id!);
      this.users = this.userService.getUsers();
      this.dataSource.data = this.users;
    }
  }

  edit(user: User): void {
    if (confirm('Are you sure you want to Edit this user?')) {
      this.editUserEvent.emit(user);
    }
  }
}
