import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAddTodo, ResponseTodo } from '../interfaces/response';
import { tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 8;
  private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';

  constructor(
    private http: HttpClient,
    private readonly state: StateService
  ) { }

  getTodoList(): Observable<ResponseTodo> | undefined {
    return this.http.get<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`).pipe(
      tap(
        resp => {
          this.state.setTodoList(resp.data);
        }
      )
    );
  }

  addTodoList(todo: Todo): Observable<ResponseAddTodo> | undefined {
    return this.http.post<ResponseAddTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, todo).pipe(
      tap(
        resp => {
          this.state.setTodoSelect(resp.data);
        }
      )
    );
  }

  editTodoList(todo: Todo): Observable<ResponseAddTodo> | undefined {
    return this.http.put<ResponseAddTodo>(`${this.ENPOINT}/${todo.id}`, todo).pipe(
      tap(
        resp => {
          this.state.setTodoSelect(resp.data);
        }
      )
    );
  }

  deleteTodoList(todo: Todo): Observable<ResponseAddTodo> | undefined {
    return this.http.delete<ResponseAddTodo>(`${this.ENPOINT}/${todo.id}`).pipe(
      tap(
        resp => {
          this.state.setTodoDeleted(resp.data);
        }
      )
    );
  }

}
