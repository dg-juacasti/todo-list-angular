import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import { tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 31;
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

  createTodoList(todoList : Todo): Observable<ResponseTodo> | undefined {
    return this.http.post<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, todoList).pipe(
      tap(
        resp => {
          this.state.setTodoList(resp.data);
        }
      )
    );
  }

  updateTodoList(todoList : Todo): Observable<ResponseTodo> | undefined {
    return this.http.put<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, todoList).pipe(
      tap(
        resp => {
          this.state.setTodoList(resp.data);
        }
      )
    );
  }

  deleteTodoList(idTarea : number): Observable<ResponseTodo> | undefined {
    return this.http.delete<ResponseTodo>(`${this.ENPOINT}/${idTarea}`).pipe(
      tap(
        resp => {
          this.state.setTodoList(resp.data);
        }
      )
    );
  }
}
