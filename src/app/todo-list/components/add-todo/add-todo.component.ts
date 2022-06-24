import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {StateService} from '../../services/state.service';
import {Todo} from '../../interfaces/todo';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

    public frmTodo: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private router: Router,
        private readonly todoService: TodoService) {
        this.frmTodo = this.fb.group({
            descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
            finishAt: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
    }


    onClickAdd() {

        const newTodo: Todo = {
            description: this.descriptionTodo.value,
            status: 0,
            id_author: 34,
            finish_at: this.finishAt.value
        };

        this.todoService.addTodo(newTodo).subscribe(value => {
                this.router.navigate(['/']);
            }
        );

    }

    onClickBack() {
        this.router.navigate(['/']);
    }

    get descriptionTodo() {
        return this.frmTodo.get('descriptionTodo') as FormControl;
    }

    get finishAt() {
        return this.frmTodo.get('finishAt') as FormControl;
    }


}
