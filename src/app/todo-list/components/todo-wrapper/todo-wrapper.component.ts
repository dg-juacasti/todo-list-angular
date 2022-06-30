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
  listPaymentsAux: Todo[] = [];
  public progressTodo: number = 0;
  public filterValue = ""; 
  public selectAllTodos = true;

  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => this.listPayments = resp);
    // TODO PIPE
    this.state.todoList$.subscribe(resp => this.listPaymentsAux = resp);
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onChangeStatus(todo: Todo) {
    if(todo.status == 0) {
      todo.status = 1;
      this.progressTodo = this.progressTodo + 1;
    } else if (todo.status == 1){
      todo.status = 0;
      this.progressTodo = this.progressTodo - 1;
    }
  }

  public addTodo() {
    this.router.navigate(['/todo']);
  }

  public editTodo(todo: Todo){
    this.router.navigate(['/todo', JSON.stringify(todo)]);
  }

  public deleteCharacterById(id:number){
    this.todoService.deleteTodo(id).subscribe(data=> {
      this.getListTodo();
    })
  }

  public applyFilterTodoList(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.listPaymentsAux = this.listPayments.filter(word => {
      return word.description.trim().toLowerCase().includes(this.filterValue.trim().toLowerCase());
    });
  }

  public showNotCompleteTodos(){
    this.selectAllTodos = false;
    this.listPaymentsAux = this.listPayments.filter(word => {
      return !word.status && word.description.trim().toLowerCase().includes(this.filterValue.trim().toLowerCase());;
    });
  }

  public showAllTodos(){
    this.selectAllTodos = true;
    this.listPaymentsAux = this.listPayments.filter(word => {
      return word.description.trim().toLowerCase().includes(this.filterValue.trim().toLowerCase());
    });
  }

}
