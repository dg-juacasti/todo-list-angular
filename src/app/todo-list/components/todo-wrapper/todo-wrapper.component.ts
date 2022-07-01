import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {
  allPayments: Todo[] = [];
  listPayments: Todo[] = [];
  search = new FormControl('');
  processed: number = 0;

  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => {
      this.listPayments = resp;
      this.allPayments = resp;
      this.getCompleted();
    });

    this.search.valueChanges
      .pipe(debounceTime(750))
      .subscribe(filter => {
        this.listPayments = this.allPayments.filter(t => t.description.toLowerCase().includes(filter.toLowerCase()));
        console.log(filter);
      });
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  async getCompleted() {
    this.processed = this.allPayments.filter(t => t.status == 1).length;
  }

  onChangeStatus(todo: Todo) {
    todo.status = todo.status === 0 ? 1 : 0;
    this.todoService.edit(todo).subscribe(res => {
      //this.getListTodo();
    });
    this.getCompleted();
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  editTodo(todo: Todo) {
    this.router.navigate(['/todo'], {
      state: { todo: todo }
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(res => {
      console.log(res);
      alert("Tarea eliminada.");
      this.getListTodo();
    });
  }

  showPending() {
    this.listPayments = this.allPayments.filter(t => t.status == 0);
  }

  showAll() {
    this.listPayments = this.allPayments;
  }
}