import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import { catchError, tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 15;
  private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';

  constructor(
    private http: HttpClient,
    private readonly state: StateService
  ) { }

  getAutoId() {
    return this.ID_AUTOR;
  }

  getTodoList(): Observable<ResponseTodo> | undefined {
    return this.http.get<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`).pipe(
      tap(
        resp => {
          this.state.setTodoList(resp.data);
        }
      ),
      catchError(this.handleError)
    );
  }

  updateTodo(todo: Todo): Observable<ResponseTodo> {
    return todo.id ?
      this.http.put<ResponseTodo>(`${this.ENPOINT}/${todo.id}`, todo).pipe(catchError(this.handleError)) :
      this.http.post<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, todo).pipe(catchError(this.handleError))
  }

  deleteTodo(id: number): Observable<ResponseTodo> {
    return this.http.delete<ResponseTodo>(`${this.ENPOINT}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error: ', error.error);
    } else {
      console.error(`Code: ${error.status}, Body: `, error.error);
    }
    return throwError(() => new Error('Se ha producido un error. Intentar más tarde'));
  }

}
