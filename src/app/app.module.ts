import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './sheard/component/user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './sheard/component/user-form/user-form.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SortPipe } from './sheard/pipe/sort.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicFormComponent } from './sheard/component/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './sheard/component/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    SortPipe,
    DynamicFormComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule ,
    MatOptionModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    DragDropModule,
    MatSnackBarModule  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
