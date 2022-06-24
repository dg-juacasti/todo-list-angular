import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import { tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { actualizarTarea, Tarea } from '../interfaces/addTarea';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 29;
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


  registrarTarea(tarea:Tarea):Observable<Object>{
    return this.http.post(`${this.ENPOINT}?id_author=${this.ID_AUTOR}`,tarea);
  }

  
 actualziarTarea(id:string,tarea:actualizarTarea):Observable<Object>{
    return this.http.put(`${this.ENPOINT}/${id}`,tarea);
  }

   eliminarHeroe(id:string):Observable<Object>{
    return this.http.delete(`${this.ENPOINT}/${id}`);
  }
}

