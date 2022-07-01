import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoWrapperComponent } from './todo-list/components/todo-wrapper/todo-wrapper.component';

const routes: Routes = [
  {path: 'tareas', component:TodoWrapperComponent},
  {path: '', redirectTo:'tareas',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
