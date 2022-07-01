import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public todoSelect$ = new BehaviorSubject<Todo>(undefined);
  public todoList$ = new BehaviorSubject<Todo[]>(undefined);

  constructor() { }

  get todoSelect() {
    return this.todoSelect$.getValue();
  }

  setTodoSelect(value: Todo) {
    this.todoSelect$.next(value);
  }

  get todoList() {
    return this.todoList$.getValue();
  }

  setTodoList(value: Todo[]) {
    this.todoList$.next(value);
  }

}
