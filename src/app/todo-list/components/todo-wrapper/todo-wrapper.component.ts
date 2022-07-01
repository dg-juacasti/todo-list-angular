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
    textButton = 'Mostrar no completados';
    isfilterActive = false;
    searchText = '';
    completedTasks = 0;
    totalTasks = 0;
    percentage = 0;

    constructor(
        private readonly todoService: TodoService,
        private readonly state: StateService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.getListTodo();
        this.state.todoList$.subscribe(resp => {
            this.listPayments = resp;
            if (resp) {
                resp.forEach(todo => {
                    if (todo.status === 1) {
                        this.completedTasks++;
                    }
                });
                this.totalTasks = resp.length;
            }

        });
    }

    getListTodo() {
        this.todoService.getTodoList().subscribe();
    }

    onChangeStatus(todo: Todo) {
        if (todo.status === 1) {
            todo.status = 0;
            this.completedTasks--;
        } else {
            todo.status = 1;
            this.completedTasks++;
        }
        this.todoService.updateTodo(todo).subscribe();
    }

    addTodo() {
        this.router.navigate(['/todo']);
    }

    updateTask(todo: Todo) {
        this.router.navigate([`/${todo.id}`]);
    }

    deleteTask(todo: Todo) {
        this.todoService.deleteTodo(todo).subscribe(
            (data) => {
                if (data.success) {
                    this.listPayments = this.listPayments.filter(obj => {
                        return obj.id !== todo.id;
                    });
                }
            },
            (error) => {
                alert('Error al eliminar registro');
            }
        );
    }

    onClickFilter() {
        this.isfilterActive = !this.isfilterActive;
        if (this.isfilterActive) {
            this.textButton = 'Mostrar todos';
        } else {
            this.textButton = 'Mostrar no completados';
        }
    }
    getPorcentage(){
        return Math.round((this.completedTasks / this.totalTasks) * 100);
    }
}
