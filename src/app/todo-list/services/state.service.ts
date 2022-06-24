import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public todoSelected$ = new BehaviorSubject<Todo>(undefined);
  public todoList$ = new BehaviorSubject<Todo[]>([]);

  constructor() { }

  get todoSelected() {
    return this.todoSelected$.getValue();
  }

  setTodoSelected(value: Todo) {
    this.todoSelected$.next(value);
  }

  get todoList() {
    return this.todoList$.getValue();
  }

  setTodoList(value: Todo[]) {
    this.todoList$.next(value);
  }

}
