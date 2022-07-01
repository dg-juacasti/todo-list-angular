import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTodoComponent } from './todo-list/components/add-todo/add-todo.component';
import { TodoWrapperComponent } from './todo-list/components/todo-wrapper/todo-wrapper.component';

const routes: Routes = [
  {path:'', component: TodoWrapperComponent},
  {path:'todo', component: AddTodoComponent},
  {path:'todo/:idTarea', component: AddTodoComponent},
  {path:'**', redirectTo:''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
