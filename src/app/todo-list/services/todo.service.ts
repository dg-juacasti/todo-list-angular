import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import { tap } from 'rxjs/operators';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 35;
  private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';
  httpClient: any;

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

  postTodoList(nuevaTodoLista : ResponseTodo) : Observable <Object> | undefined{
    return this.http.post(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, nuevaTodoLista)

  }

  putTodoList(actualiTodoLista : ResponseTodo, id_author : string) : Observable <Object> {
    return this.http.put(`${this.ENPOINT}/3}`,actualiTodoLista)
  }

  deleteTodoList(idAuthor : string) : Observable <Object> {
    return this.http.delete(`${this.ENPOINT}/3}`)
  }

}
