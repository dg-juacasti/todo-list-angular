import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoGetallComponent } from './Components/todo-getall/todo-getall.component';
import { TodoCreateComponent } from './Components/todo-create/todo-create.component';
import { TodoEditComponent } from './Components/todo-edit/todo-edit.component';
import { TodoDeleteComponent } from './Components/todo-delete/todo-delete.component';
import { TodoSearchComponent } from './Components/todo-search/todo-search.component';

const routes: Routes = [
  { path: '', component:TodoGetallComponent },
  { path: 'create', component:  TodoCreateComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    TodoGetallComponent,
    TodoCreateComponent,
    TodoEditComponent,
    TodoDeleteComponent,
    TodoSearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
