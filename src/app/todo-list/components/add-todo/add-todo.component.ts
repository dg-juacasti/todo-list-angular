import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;
  todo: Todo;
  createDate: Date = new Date()

  constructor(
    private readonly fb: FormBuilder,
    private todoService: TodoService,
    private stateService: StateService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.todo = this.stateService.todoSelect;
    this.frmTodo = this.fb.group({
      descriptionTodo: [this.todo?.description ? this.todo.description : null, [Validators.maxLength(50), Validators.required]],
      finishAt: [this.todo?.finish_at ? formatDate(this.todo.finish_at, 'yyyy-MM-dd', 'en-US') : null, [Validators.required]]
    });
  }

  onClickAdd() {
    let todo: Todo = undefined;
    if (this.todo?.id) {
      todo = {
        id: this.todo.id,
        description: this.frmTodo.value.descriptionTodo,
        finish_at: this.frmTodo.value.finishAt,
        id_author: this.todo.id_author,
        status: this.todo.status,
        created_at: this.todo.created_at,
      }
    } else {
      todo = {
        description: this.frmTodo.value.descriptionTodo,
        finish_at: this.frmTodo.value.finishAt,
        id_author: this.todoService.getAutoId(),
        status: 0,
        created_at: this.createDate.toISOString(),
      }
    }
    this.todoService.updateTodo(todo).pipe(
      tap(resp => {
        if (resp.success) {
          this.onGoToMainPage()
        } else {
          alert("Estimado cliente se produjo un error al agregar la tarea")
        }
      })
    ).subscribe();
  }

  onClickBack() {
    this.onGoToMainPage()
  }

  onGoToMainPage() {
    this.stateService.setTodoSelect(undefined)
    this.router.navigate(['/']);
  }

}
