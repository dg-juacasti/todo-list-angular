import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  public frmTodo: FormGroup;
  todo: Todo;

  constructor(
    private readonly fb: FormBuilder, private readonly todoService: TodoService) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      description: new FormControl('', [Validators.maxLength(50), Validators.required]),
      finish_at: [null, [Validators.required]],
    });
  }

  onClickAdd() {
    let todo = this.frmTodo.getRawValue();
    this.NewTodo(todo);
  }


  NewTodo(todo: Todo) {
    todo.status = 0;
    this.todoService.newTodo(todo).subscribe(
      (response) => {
        if (response) {
          console.log('Todo creado satisfactoriamente');
        }
      },
      (error) => {
        console.log('No se pudo crear el usuario');
      }
    );
  }
}
