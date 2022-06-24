import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  action: string = "Agregar";
  isNew: boolean = true;

  public frmTodo: FormGroup;
  todo: Todo = {
    id: 0,
    id_author: 0,
    status: 0,
    description: '',
    finish_at: '',
    created_at: ''
  };

  constructor(
    private readonly todoService: TodoService,
    private readonly fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isNew = true;
    let state = history.state;
    if (state != null) {
      var tTemp = state.todo;
      if (tTemp != null && tTemp != undefined) {
        this.todo = tTemp;
        this.action = "Editar";
        this.isNew = false;
      }
    }

    this.frmTodo = this.fb.group({
      descriptionTodo: [this.todo.description, [Validators.maxLength(50), Validators.required]],
      finishAt: [this.todo.finish_at, [Validators.required]]
    });
  }

  onClickAdd() {
    this.todo.finish_at = this.frmTodo.controls['finishAt'].value;
    this.todo.description = this.frmTodo.controls['descriptionTodo'].value;

    if (this.isNew) {
      this.todoService.add(this.todo).subscribe(res => {
        console.log(res);
        alert("Datos guardados con éxito.");
        this.onClickReturn();
      });
    }
    else {
      this.todoService.edit(this.todo).subscribe(res => {
        console.log(res);
        alert("Datos actualizados con éxito.");
        this.onClickReturn();
      });
    }
  }

  onClickReturn() {
    this.router.navigate(['/']);
  }
}
