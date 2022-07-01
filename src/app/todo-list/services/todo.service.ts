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

  private readonly ID_AUTOR = 32;
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

  postCrearTarea(item: Todo): Observable<Object> | undefined {
    return this.http.post(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, item);
  }
  
  putActualizaTarea(id:(number | undefined), item: Todo):Observable<Object> | undefined{
    return this.http.put(`${this.ENPOINT}/${id}`, item);    
  }

  deleteTarea(id:(number | undefined) ):Observable<any>{
    return this.http.delete(`${this.ENPOINT}/${id}`);    
  }

}
