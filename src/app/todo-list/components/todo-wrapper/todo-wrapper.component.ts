import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interfaces/todo';
import {StateService} from '../../services/state.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-todo-wrapper',
    templateUrl: './todo-wrapper.component.html',
    styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

    listPayments: Todo[] = [];
    frmTodo: FormGroup;
    filter = 0;
    filterStatusText = 'Mostrar no completados';

    constructor(
        private readonly todoService: TodoService,
        private readonly state: StateService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.builForm();
    }

    ngOnInit(): void {

        this.getListTodo();
        this.state.todoList$.subscribe(resp => this.listPayments = resp);


    }

    getListTodo() {
        this.todoService.getTodoList().subscribe();
    }

    onChangeStatus(todo: Todo) {
        todo.status = todo.status === 1 ? 0 : 1;

        this.todoService.updateTodo(todo).subscribe(value => {
            console.log(value);
        });
        /*this.state.setTodoSelect(todo);*/
    }

    addTodo() {
        this.router.navigate(['/todo']);
    }

    builForm() {
        this.frmTodo = this.formBuilder.group({
            descriptionTodo: ['', []]
        });
    }

    get descriptionTodo() {
        return this.frmTodo.get('descriptionTodo') as FormControl;
    }

    filterStatus() {
        console.log(this.filter);

        if (this.filter === 1) {
            this.filter = 0;
            this.filterStatusText = 'Mostrar no completados';
        } else {
            this.filter = 1;
            this.filterStatusText = 'Mostrar todos';
        }
        console.log(this.filter);

    }

    onDeleteClick(id: number) {
        this.todoService.deleteTodo(id).subscribe(value => {
            this.getListTodo();
        });
    }

    onEditClick(id: number) {
        this.router.navigate([`/todo/${id}`]);

    }


}
