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

  private readonly ID_AUTOR = 11;
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

  addTodo(todo:Todo): Observable<any> | undefined {
    return this.http.post<any>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`,todo);
  }
  editTodo(todo:Todo,id:number): Observable<any> | undefined {
    return this.http.put<any>(`${this.ENPOINT}/${id}`,todo);
  }
  
  deleteTodo(id:number): Observable<any> | undefined {
    return this.http.delete<any>(`${this.ENPOINT}/${id}`);
  }
  
}
