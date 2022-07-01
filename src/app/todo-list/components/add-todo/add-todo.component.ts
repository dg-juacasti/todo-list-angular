import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private todoServices:TodoService,
    private router:Router) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
    const todo= new Todo();
    todo.description=this.frmTodo.controls.descriptionTodo.value;
    todo.finish_at=this.frmTodo.controls.finishAt.value;
    todo.id_author=30;
    todo.status=0;
   this.todoServices.addTodo(todo).subscribe(i=>{
    this.router.navigate(['/']);
   });

  }


}
