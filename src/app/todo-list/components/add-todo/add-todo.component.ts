import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  todo: Todo;
  public frmTodo: FormGroup;

  constructor(private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
    let desc=this.frmTodo.controls.descriptionTodo.value;
    let fecha=this.frmTodo.controls.finishAt.value;
    this.todoService.crearTarea(desc,fecha).subscribe();
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
