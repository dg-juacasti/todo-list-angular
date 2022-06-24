import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interfaces/todo';
import {StateService} from '../../services/state.service';

@Component({
    selector: 'app-todo-wrapper',
    templateUrl: './todo-wrapper.component.html',
    styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

    listPayments: Todo[] = [];

    constructor(
        private readonly todoService: TodoService,
        private readonly state: StateService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.getListTodo();
        // this.state.todoList$.subscribe(resp => {
        //     console.log(resp);
        //     this.listPayments = resp;
        //     console.log(resp);
        // });
    }

    getListTodo() {
        this.todoService.getAllHeroesList().subscribe(
            resp => {
                console.log(resp);
                if (resp.success) {
                    this.listPayments = resp.data;
                    console.log(resp.data);
                } else {
                    alert('Error al Obtener registros');
                    console.log(resp);
                }
            },
            (error) => {
                alert('Error al Obtener registros');
            }
        );
    }


    onChangeStatus(todo: Todo) {
    }

    addTodo() {
        this.router.navigate(['/todo']);
    }

}
