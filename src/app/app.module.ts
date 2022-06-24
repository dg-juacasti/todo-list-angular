import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {AddTodoComponent} from './todo-list/components/add-todo/add-todo.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {TodoWrapperComponent} from './todo-list/components/todo-wrapper/todo-wrapper.component';
import {FilterTodo} from './todo-list/pipes/filter-todo.pipe';
import {TodoResolver} from './todo-list/resolvers/todo.resolver';


const appRoutes: Routes = [
    {path: '', component: TodoWrapperComponent},
    {path: 'todo', component: AddTodoComponent},
    {
        path: 'todo/:id', component:
        AddTodoComponent, resolve: {
            todo: TodoResolver
        },
    }
];

@NgModule({
    declarations: [
        AppComponent,
        AddTodoComponent,
        TodoWrapperComponent,
        FilterTodo
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
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA],
})
export class AppModule {
}
