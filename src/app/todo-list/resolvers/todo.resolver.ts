import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TodoService} from '../services/todo.service';
import {Todo} from '../interfaces/todo';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoResolver implements Resolve<Todo> {

    constructor(
        private todoService: TodoService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const {id} = route.params;
        return this.todoService.getTodoById(id);
    }
}
