import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnChanges, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions', 'edit'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  users: User[] = [];

  @Input() user!: User;
  @Input('updatedUser') updatedUser!: User;
  @Output() editUserEvent: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private userService: UserService, private dialog: MatDialog) {}

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
      this.dataSource.data = [...this.users];  // Update the dataSource after changes
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filter = filterValue;
  }

  getFilterPredicate(): (data: User, filter: string) => boolean {
    return (data: User, filter: string): boolean => {
      const searchTerms = filter.trim().toLowerCase();
      const name = data.name ? data.name.toLowerCase() : '';
      const email = data.email ? data.email.toLowerCase() : '';
      const role = data.role ? data.role.toLowerCase() : '';

      return name.includes(searchTerms) || email.includes(searchTerms) || role.includes(searchTerms);
    };
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "You are about to delete this user. Do you want to proceed?"
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.deleteUser(user.id!);
        this.users = this.userService.getUsers();
        this.dataSource.data = this.users;
      } else {
        console.log('Deletion canceled');
      }
    });
  }

  edit(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to edit this user?'
      }
    });
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.editUserEvent.emit(user);
      } else {
        console.log('Edit canceled');
      }
    });
  }
}
