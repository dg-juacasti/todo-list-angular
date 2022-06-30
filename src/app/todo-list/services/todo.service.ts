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

  private readonly ID_AUTOR = 9;
  private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';

  constructor(
    private http: HttpClient,
    private readonly state: StateService
  ) { }

  getTodoList(): Observable<ResponseTodo> | undefined {
    const pathEndPoint = `${this.ENPOINT}/?id_author=${this.ID_AUTOR}`;
    return this.http.get<ResponseTodo>(pathEndPoint).pipe(
      tap(
        resp => {
          this.state.setTodoList(resp.data);
        }
      )
    );
  }

  getTodoListAll(): Observable<ResponseTodo> | undefined {
    const pathEndPoint = `${this.ENPOINT}/?id_author=${this.ID_AUTOR}`;
    return this.http.get<ResponseTodo>(pathEndPoint);
  }


  postTodo(data: Todo) {
    const pathEndPoint = `${this.ENPOINT}/?id_author=${this.ID_AUTOR}`;
    return this.http.post<ResponseTodo>(pathEndPoint, data);
  }

  updateTodo(data: Todo) {
    const pathEndPoint = `${this.ENPOINT}/${data.id}`;
    return this.http.put(pathEndPoint, data);
  }

  deleteTodo(id: number) {
    const pathEndPoint = `${this.ENPOINT}/${id}`;
    return this.http.delete(pathEndPoint);
  }

}
