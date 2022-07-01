import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../../services/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../../interfaces/todo';
import {StateService} from '../../services/state.service';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

    public frmTodo: FormGroup;
    todoURLParam = '';
    textButton = 'Agregar';
    todo: Todo = {
        id_author: 6,
        status: 0,
        description: '',
        finish_at: '2022-03-03T01:37:01.828Z',
    };

    constructor(
        private readonly fb: FormBuilder,
        private todoService: TodoService, private router: Router,
        private readonly state: StateService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.todoURLParam = this.route.snapshot.params.todoURLParam;
        if (this.todoURLParam !== 'todo') {
            this.configureForEdit();
        }
        this.frmTodo = this.fb.group({
            descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
            finishAt: [null, [Validators.required]]
        });

    }

    private configureForEdit(): void {
        const id: number = +this.todoURLParam;
        this.textButton = 'Editar';
        this.todoService.getTodoList().subscribe(resp => {
            if (resp.data) {
                this.todo = resp.data.filter(obj => {
                    return obj.id === id;
                })[0];
                this.frmTodo = this.fb.group({
                    descriptionTodo: [this.todo.description, [Validators.maxLength(50), Validators.required]],
                    finishAt: [this.todo.finish_at, [Validators.required]]
                });
            } else {
                console.error('No se encontro el registro');
            }
        }, error => {
            console.error('No se encontro el registro');

        });
    }

    onClickAdd() {
        this.todo.description = this.frmTodo.value.descriptionTodo;
        this.todo.status = 0;
        this.todo.finish_at = this.frmTodo.value.finishAt;
        this.todo.id_author = 16;
        console.log(this.todo);
        if (this.todoURLParam === 'todo') {
            this.todoService.postNewTodo(this.todo).subscribe(
                (data) => {
                    if (data.success) {
                        alert('creado exitosamente');
                        this.router.navigate(['/']);
                    } else {
                        alert('Error al crear registro');
                        console.error(data);
                    }
                },
                (error) => {
                    alert('Error al crear registro');
                }
            );

        } else {
        this.todoService.updateTodo(this.todo).subscribe(
            (data) => {
                if (data.success) {
                    alert('actualizado exitosamente');
                    this.router.navigate(['/']);
                } else {
                    alert('Error al actualizar registro');
                    console.error(data);
                }
            },
            (error) => {
                alert('Error al actualizar registro');
            }
        );
        }
    }

    onClickReturn() {
        this.router.navigate(['/']);
    }


}
