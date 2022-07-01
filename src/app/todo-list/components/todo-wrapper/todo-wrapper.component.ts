import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { AddTodoComponent } from '../add-todo/add-todo.component';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  @ViewChild(AddTodoComponent) actualizarTarea: AddTodoComponent;

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

  deleteTarea(tarea:Todo)
  {
    let id:number = tarea.id;
    this.todoService.deleteTarea(tarea.id).subscribe(statusObj => {
      console.log(statusObj);
       if(statusObj["message"] == "Personaje eliminado"){
         let personajeToRemove = this.listPayments.filter(c=> c.id === id)[0];
         let index = this.listPayments.indexOf(personajeToRemove);
         this.listPayments.splice(index,1);
       }
     })
    ;
  }

  editTarea(tarea:Todo)
  {
    this.router.navigate(['/todo']);
  }
}
