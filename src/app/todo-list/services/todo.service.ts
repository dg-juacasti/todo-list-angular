import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 3;
  readonly ENPOINT = 'https://bp-todolist.herokuapp.com';

  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`).pipe(
      map(resp => { return resp; })
    );
  }

  newTodo(todo: Todo): Observable<any> {
    todo.id_author = this.ID_AUTOR;
    return this.httpClient.post<any>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, todo)
  }

  updateTodo(todo: Todo): Observable<any> {
    todo.id_author = this.ID_AUTOR;
    return this.httpClient.put<any>(this.ENPOINT + '/' + todo.id, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.httpClient.delete<boolean>(this.ENPOINT + '/' + id);
  }
}