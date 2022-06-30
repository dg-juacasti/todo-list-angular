import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;
  public todoUpdate: string;
  public todoUpdateAux: Todo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly todoService: TodoService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.todoUpdate = this.route.snapshot.paramMap.get('id');
    
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });

    if(this.todoUpdate){
      this.todoUpdateAux = JSON.parse(this.todoUpdate);
      this.frmTodo.setValue({
        descriptionTodo: this.todoUpdateAux.description,
        finishAt: this.todoUpdateAux.finish_at
      });
    }
  }

  onClickAdd() {
    this.addTodo();
  }

  addTodo() {
    const todo: Todo = {
      id_author: 6,
      status: 0,
      description: this.frmTodo.controls['descriptionTodo'].value,
      finish_at: this.frmTodo.controls['finishAt'].value,
    }

    this.todoService.addTodo(todo).subscribe(data=> {
      this.router.navigate(['/'])
    })
  }

  updateTodo(){
    const todo: Todo = {
      id: this.todoUpdateAux.id, 
      id_author: 6,
      status: 0,
      description: this.frmTodo.controls['descriptionTodo'].value,
      finish_at: this.frmTodo.controls['finishAt'].value,
    }

    this.todoService.updateTodo(todo).subscribe(data=> {
      this.router.navigate(['/'])
    })
  }
}
