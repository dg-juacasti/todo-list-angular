import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TodoService} from '../services/todo.service';
import {Todo} from '../interfaces/todo';

@Injectable({
    providedIn: 'root'
})
export class TodoResolver implements Resolve<Todo> {

    constructor(
        private todoService: TodoService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Todo> {
        const {id} = route.params;
        console.log(id);

        this.todoService.getTodoById(id).subscribe(value => {
            console.log(value);
        });
        return null;
    }
}
