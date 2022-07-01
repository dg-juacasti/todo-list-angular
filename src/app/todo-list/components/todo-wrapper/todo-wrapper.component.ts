import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];

  searchTask = '';
  checkTask = 0;

  textBottom = 'Mostrar no completados';


  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => this.listPayments = resp);
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onChangeStatus(todo: Todo) {
    if (todo.status === 0){
      const data = {
        description: todo.description,
        status: 1,
        id_author: todo.id_author,
        finish_at: todo.finish_at
      };
      this.todoService.updateTodoList(todo.id, data).subscribe();
      this.getListTodo();
    }
    else {
      const data = {
        description: todo.description,
        status: 0,
        id_author: todo.id_author,
        finish_at: todo.finish_at
      };
      this.todoService.updateTodoList(todo.id, data).subscribe();
      this.getListTodo();
    }
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  showUncompleted() {
    if (this.textBottom === 'Mostrar no completados'){
      this.textBottom = 'Mostrar Todos';
    }
    else{
        this.textBottom = 'Mostrar no completados';
    }

  }

}
