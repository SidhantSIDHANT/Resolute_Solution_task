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
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnChanges, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions', 'edit'];
  dataSource: MatTableDataSource<User>;
  users: User[] = [];
  
  sortBy: string = 'name';  
  sortDirection: string = 'asc'; 

  @Input() user!: User;
  @Input('updatedUser') updatedUser!: User;
  @Output() editUserEvent: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private userService: UserService, private dialog: MatDialog) {
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

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result : boolean)=>{
      if(result){
        this.editUserEvent.emit(user);
      }else{
        console.log('Edit canceled');
      }
    });
  }
}
