import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import { catchError, map, tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 5;
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

  addRecord(record:any) {
    const entrada = {
      description: record.description,
      finish_at: record.finishAt,
      id_author: 5,
      status: 0
    };
    return this.http
      .post<any>("https://bp-todolist.herokuapp.com/?id_author=5", entrada)
      .pipe(
        map((respuesta) => {
          return respuesta;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  editRecord(record:any,id:number,status:number):Observable<any>{
    const entrada = {
      description: record.description,
      finish_at: record.finishAt,
      id_author: 5,
      status: status
    };
    return this.http
      .put<any>("https://bp-todolist.herokuapp.com/"+id, entrada)
      .pipe(
        map((respuesta) => {
          return respuesta;
        }),
        catchError(err => {
          return throwError(err);
        })
      );

  }

  deleteRecord(id: number) {

    return this.http.delete<number>("https://bp-todolist.herokuapp.com/" + id);
  }

}
