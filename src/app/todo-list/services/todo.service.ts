import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import {catchError, tap} from 'rxjs/operators';
import { StateService } from './state.service';
import {Todo} from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 37;
  private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

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

  postTodo(todo: Todo) {
    return this.http.post(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, todo, this.httpOptions)
        .pipe(
            catchError(this.handleError('postTodo', todo))
        );
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.ENPOINT}/${id}`)
        .pipe(
            catchError(this.handleError('deleteTodo', id))
        );
  }

  updateTodo(todo: Todo, id: number) {
    return this.http.put(`${this.ENPOINT}/${id}`, todo, this.httpOptions)
        .pipe(
            catchError(this.handleError('postTodo', todo))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
