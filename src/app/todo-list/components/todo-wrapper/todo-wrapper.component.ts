import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss'],
})
export class TodoWrapperComponent implements OnInit {
  listPayments: Todo[] = [];
  input: FormGroup;
  check: FormControl = new FormControl();

  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router,
    private readonly fb: FormBuilder,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.form();
    this.getListTodo();
    this.state.todoList$.subscribe((resp) => (this.listPayments = resp));
  }
  private form() {
    this.input = this.fb.group({
      descriptionTodo: [],
    });
  }
  private deleteTodoState(id: number): Todo[] {
    return this.listPayments.filter((data) => {
      if (data.id !== id) {
        return data;
      }
    });
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onChangeStatus(todo: Todo) {
    let status = 0;
    if (this.check.value) {
      status = 1;
    }
    const createTodo: Todo = {
      description: todo.description,
      finish_at: todo.created_at,
      status: status,
      id_author: todo.id_author,
    };
    this.todoService.update(todo.id, createTodo).subscribe(
      (data) => {
        const findTodo = this.listPayments.map((data) => {
          if (data.id === todo.id) {
            data.status = status;
          }
          return data;
        });
        this.state.setTodoList(findTodo);
      },
      (err) => {
        console.log('no se Edito correctamente');
      }
    );
  }

  addTodo() {
    this.zone.run(() => {
      this.router.navigate(['/todo']);
    });
  }
  delete(id: number) {
    this.todoService.delete(id).subscribe(
      (data) => {
        console.log(data);
        console.log('Todo Eliminado Correctamente');
        const newList = this.deleteTodoState(id);
        this.state.setTodoList(newList);
      },
      (err) => console.log('No se elimino el todo correctamente')
    );
  }
  update(todo: Todo) {
    this.state.setTodoSelect(todo);
    this.zone.run(() => {
      this.router.navigate(['/todo']);
    });
  }
}
