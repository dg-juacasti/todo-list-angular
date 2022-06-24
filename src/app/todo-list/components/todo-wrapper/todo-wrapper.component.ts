import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interfaces/todo';
import {StateService} from '../../services/state.service';
import {ResponseTodo} from '../../interfaces/response';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  completedPayments = 0;
  listPayments: Todo[] = [];
  listPaymentsAux: Todo[] = [];
  showAll = true;

  constructor(
      private readonly todoService: TodoService,
      private readonly state: StateService,
      private router: Router) {
  }

  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => this.listPayments = resp);
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
    this.completedPayments = this.listPayments?.filter(lp => lp.status === 1).length;
  }

  onChangeStatus(todo: Todo) {
    const todoUpdate: Todo = {
      description: todo.description,
      status: todo.status === 1 ? 0 : 1 ,
      id_author: 37,
      finish_at: todo.finish_at
    };
    this.todoService.updateTodo(todoUpdate, todo.id).subscribe(
        (resp: ResponseTodo) => {
          if (resp.success) {
            window.alert('Tarea actualizada exitosamente!');
            this.getListTodo();
          } else {
            window.alert('Error en el servicio, intente nuevamente');
          }
        });
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  searchTodo(search: string) {
    if (this.listPayments?.filter(lp => lp.description.includes(search)).length > 0 && search !== '') {
      this.listPayments = this.listPayments?.filter(lp => lp.description.includes(search));
    } else {
      this.getListTodo();
    }
  }

  filterTodo(status: number) {
    this.showAll = !this.showAll;
    if (status === 0) {
      this.listPayments = this.listPayments?.filter(lp => lp.status === status);
    } else {
      this.getListTodo();
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
        (resp: ResponseTodo) => {
          if (resp.success) {
            window.alert('Tarea eliminada exitosamente!');
            this.getListTodo();
          } else {
            window.alert('Error en el servicio, intente nuevamente');
          }
        });
  }

}
