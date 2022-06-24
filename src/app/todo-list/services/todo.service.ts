import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseTodo } from "../interfaces/response";
import { tap } from "rxjs/operators";
import { StateService } from "./state.service";
import { Todo } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private readonly ID_AUTOR = 4;
  private readonly ENDPOINT = "https://bp-todolist.herokuapp.com";

  constructor(private http: HttpClient, private readonly state: StateService) {}

  getTodoList(): Observable<ResponseTodo> {
    return this.http
      .get<ResponseTodo>(`${this.ENDPOINT}/?id_author=${this.ID_AUTOR}`)
      .pipe(
        tap((resp) => {
          this.state.setTodoList(resp.data);
        })
      );
  }

  createTodo(todo: Todo) {
    return this.http.post<ResponseTodo>(
      `${this.ENDPOINT}/?id_author=${this.ID_AUTOR}`,
      todo
    );
  }

  updateTodo(id: number, todo: Todo) {
    return this.http.put<ResponseTodo>(`${this.ENDPOINT}/${id}`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete<ResponseTodo>(`${this.ENDPOINT}/${id}`);
  }
}
