import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  nombreTarea: string='';

  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => this.listPayments = resp);
     
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onChangeStatus(todo: Todo) {
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }
  updateList(todo: Todo){

    localStorage.setItem('listPayments', JSON.stringify(todo));

    this.router.navigate(['/todo'],{queryParams: {idTarea: todo.id}});
  }
  eliminarTarea(idTarea: number){
    this.todoService.deleteTodoList(idTarea).subscribe();
  }
  buscarTarea(){
    this.listPayments.find(x => x.description == this.nombreTarea)
  }
}
