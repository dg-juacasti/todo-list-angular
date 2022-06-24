import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {Todo} from "../../interfaces/todo";
import {TodoService} from "../../services/todo.service";
import {ResponseTodo} from "../../interfaces/response";

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
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
    const todo: Todo = {
      description: this.frmTodo.controls['descriptionTodo'].value,
      status: 0,
      id_author: 37,
      finish_at: this.frmTodo.controls['finishAt'].value
    };
    this.todoService.postTodo(todo).subscribe(
        (resp: ResponseTodo) => {
        if (resp.success) {
          this.router.navigate(['/']);
          window.alert('Tarea creada exitosamente!');
        } else {
          window.alert('Error en el servicio, intente nuevamente');
        }
      });
  }

  onCLickBack() {
    this.router.navigate(['/']);
  }


}
