import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AddTodoComponent } from './todo-list/components/add-todo/add-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoWrapperComponent } from './todo-list/components/todo-wrapper/todo-wrapper.component';
import { SelectTodoComponent } from './todo-list/components/select-todo/select-todo.component';
import { SelectTodoTrackingComponent } from './todo-list/components/select-todo-tracking/select-todo-tracking.component';
import { UpdateTodoComponent } from './todo-list/components/update-todo/update-todo.component';




const appRoutes: Routes = [
  { path: '', component: TodoWrapperComponent },
  { path: 'todo', component: AddTodoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    TodoWrapperComponent,
    SelectTodoComponent,
    SelectTodoTrackingComponent,
    UpdateTodoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
