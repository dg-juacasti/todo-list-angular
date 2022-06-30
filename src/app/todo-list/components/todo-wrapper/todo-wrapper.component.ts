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
  filter: string = '';
  todoCompleted: number = 0;
  showedAll: boolean = true;

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

  search() {
    console.log(this.filter)
    if (this.filter) {
      const filteredList = this.listPayments.filter(todo => todo.description.includes(this.filter));
      this.listPayments = [...filteredList]
    } else {
      this.getListTodo();
    }

  }

  onChangeStatus(todo: Todo) {
    todo.status = todo.status ? 0 : 1;
    this.todoService.editTodoList(todo).subscribe(() => {
    })
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  onClicShowAll() {

    this.showedAll = !this.showedAll;
    if (this.showedAll) {
      this.getListTodo();
    } else {
      this.listPayments = this.listPayments.filter(todo => todo.status === 0);
    }
  }

  onClickEdit(todo: Todo) {
    this.state.setTodoSelect(todo);
    this.router.navigate(['/todo'])
  }

  onClickDelete(todo: Todo) {
    this.todoService.deleteTodoList(todo).subscribe(res => {
      if (res.success) {
        this.getListTodo();
      }
    })
  }

}
