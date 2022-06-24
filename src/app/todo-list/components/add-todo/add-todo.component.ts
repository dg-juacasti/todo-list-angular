import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { creaService } from '../../services/crea.service';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;

  Tarea : Todo[] = [];

  constructor(
    private readonly fb: FormBuilder) {
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router) { }    
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
    creaListTodo() {
      this.creaService.creaTodoList().subscribe();
    };
  
    onChangeStatus(todo: Todo) {
    };


  }


}
