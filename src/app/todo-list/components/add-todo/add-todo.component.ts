import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';
import { StateService } from '../../services/state.service';
import {TodoWrapperComponent} from '../todo-wrapper/todo-wrapper.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;
  todo: Todo;

  constructor(
    private http: HttpClient,
    private todoService: TodoService,
    private stateService: StateService,
    private readonly fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
    if (this.frmTodo.valid) {
      this.todo = {
        description: this.frmTodo.get('descriptionTodo')?.value,
        finish_at: this.frmTodo.get('finishAt')?.value,
        created_at: new Date(Date.now()).toISOString(),
        id_author: 0,
        status: 1
      };


      this.todoService.addTodo(this.todo).subscribe(dato => {
        swal.fire('Registro exitoso...', "", 'success');
      }, error => console.log(error));
      //this.todoWrapper.getListTodo();
      //this.router.navigate(['/']);
    }
  }
  onClickVolver() {
    this.router.navigate(['/']);
  }



}
