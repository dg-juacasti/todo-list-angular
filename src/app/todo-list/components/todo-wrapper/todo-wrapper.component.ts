import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  searchList: Todo[] = []
  showAll: boolean = true;

  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => {
      this.listPayments = resp;
      this.searchList = resp;
    });
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onClickShowAll() {
    this.showAll = !this.showAll;
    if (this.showAll) {
      this.searchList = this.listPayments;
    } else {
      this.searchList = this.listPayments.filter(e => e.status == 0)
    }
  }

  getCompleteTodo() {
    let cont = 0;
    this.listPayments.forEach(e => {
      if (e.status != 0) {
        cont++
      }
    })
    return cont;
  }

  onChangeStatus(todo: Todo) {
    todo.status = 1;
    this.todoService.updateTodo(todo).pipe(
      tap(resp => {
        if (!resp.success) {
          alert("Estimado cliente se produjo un error con la tarea")
        }
      })
    ).subscribe();
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  onKeyUp(event: string) {
    this.searchList = this.listPayments.filter(e => e.description.toLowerCase().includes(event.toLowerCase()))
  }

  editTodo(todo: Todo) {
    this.state.setTodoSelect(todo);
    this.router.navigate(['/todo']);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id).pipe(
      tap(
        resp => {
          if (resp.success) {
            this.getListTodo();
            alert("Estimado cliente la tarea se elimino exitosamente")
          } else {
            alert("Estimado cliente se presento un problema al eliminar la tarea")
          }
        }
      )
    ).subscribe()
  }

}
