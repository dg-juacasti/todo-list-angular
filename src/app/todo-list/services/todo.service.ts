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

  private readonly ID_AUTOR = 6;
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

  addTodo(todo:Todo){
    return this.http.post<Todo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, todo);
  }

  updateTodo(todo:Todo){
    return this.http.put<Todo>(`${this.ENPOINT}/${todo.id}`, todo);
  }

  deleteTodo(id:Number){
    return this.http.delete(`${this.ENPOINT}/${id}`)
  }

  

}
