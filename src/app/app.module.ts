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
import { NuevaListaComponent } from './todo-lis/tcomponents/nueva-lista/nueva-lista.component';
import { ActualizaListaComponent } from './todo-list/components/actualiza-lista/actualiza-lista.component';


const appRoutes: Routes = [
  { path: '', component: TodoWrapperComponent },
  { path: 'todo', component: AddTodoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    TodoWrapperComponent,
    NuevaListaComponent,
    ActualizaListaComponent
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
