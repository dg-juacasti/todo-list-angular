import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../../services/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../../interfaces/todo';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

    public frmTodo: FormGroup;
    todoURLParam = '';
    todo: Todo = {
        id_author: 6,
        status: 0,
        description: '',
        finish_at: '2022-03-03T01:37:01.828Z',
    };

    constructor(
        private readonly fb: FormBuilder,
        private todoService: TodoService, private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.getParamsRoute();
        this.frmTodo = this.fb.group({
            descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
            finishAt: [null, [Validators.required]]
        });

    }

    private getParamsRoute() {
        this.todoURLParam = this.route.snapshot.params.todoURLParam;
    }

    onClickAdd() {
        this.todo.description = this.frmTodo.value.descriptionTodo;
        this.todo.status = 0;
        this.todo.finish_at = this.frmTodo.value.finishAt;
        this.todo.id_author = 16;

        console.log(this.todoURLParam);

        if (this.todoURLParam === 'todo') {
            this.todoService.postNewTodo(this.todo).subscribe(
                (data) => {
                    if (data.success) {
                        alert('creado exitosamente');
                        this.router.navigate(['/']);
                    } else {
                        alert('Error al crear registro');
                        console.log(data);
                    }
                },
                (error) => {
                    alert('Error al crear registro');
                }
            );
        }
        // } else {
        // this.heroesService.updateMarvelHero(this.hero).subscribe(
        //     (data) => {
        //       alert('actualizado exitosamente');
        //       this.router.navigate(['/']);
        //     },
        //     (error) => {
        //       alert('Error al actualizar registro');
        //     }
        // );
        // }
    }


}
