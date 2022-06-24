import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import { tap } from 'rxjs/operators';
import { StateService } from './state.service';
import {Todo} from '../interfaces/todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 20;
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

  crearTarea( desc:string, fechaFin:string): Observable<Todo> { 
    let todo: Todo;
    todo ={
      id_author: this.ID_AUTOR,
      status: 0,
      description: desc,
      finish_at: fechaFin,
    };
    return this.http.post<Todo>(
      `${this.ENPOINT}/?id_author=${this.ID_AUTOR}`,
      todo,
      this.httpOptions
    );
  }
  private httpOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  actualizarTarea( desc:string, fechaFin:string, idTarea:number ):Observable<Todo> {
    let todo: Todo;
    todo ={
      id: idTarea,
      id_author: this.ID_AUTOR,
      status: 0,
      description: desc,
      finish_at: fechaFin,
    };
    return this.http.post<Todo>(
      `${this.ENPOINT}/?id_author=${this.ID_AUTOR}`,
      todo,
      this.httpOptions
    );
  }


eliminarTarea(){
  
}

}
