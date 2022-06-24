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

  private readonly ID_AUTOR = 23;
  private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';
 /*  https://bp-todolist.herokuapp.com/?id_author=1 */
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

  addTodoList(InterfresponseTodo:ResponseTodo):Observable<Object>{
    return this.http.post(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`,InterfresponseTodo
    );
  }

  updTodoList(InterfresponseTodo:ResponseTodo,idtask:number):Observable<Object>{
    return this.http.put(`${this.ENPOINT}/${idtask}?id_author=${this.ID_AUTOR}`,InterfresponseTodo)
  }
  delTodoLista(idtask:number):Observable<Object>{
    return this.http.delete(`${this.ENPOINT}/${idtask}?id_author=${this.ID_AUTOR}`)
  }

   

}