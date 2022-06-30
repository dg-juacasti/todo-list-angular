import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  listTemp: Todo[] = [];
  txtFind: string;
  contentButton: string = "Mostrar no completadas";
  flagState: boolean = false;

  constructor(
    private readonly todoService: TodoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.todoService.getTodoList().subscribe(
      (response) => {
        if (response)

          this.listPayments = response.data;
        this.listTemp = response.data;
      },
      (error) => {
        console.log();
      }
    );
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      (response) => {
        if (response) {
          alert("Tod eliminado satisfactoriamente");
          this.getAll();
        }
      },
      (error) => {
        alert('No se pudo eliminar el todo');
      }
    )
  }

  findText() {

    let textSearch = this.txtFind.toLowerCase();

    if (textSearch === '') {
      this.getAll();
    } else {
      this.listPayments = this.listTemp.filter((element) =>
        element.description.toLowerCase().includes(textSearch));
    }
  }

  onFilter() {
    this.flagState = !this.flagState;
    if (this.flagState) {
      this.contentButton = "Mostrar todos";
      this.listPayments = this.listTemp.filter((element) => !element.status);
    }
    else {
      this.contentButton = "Mostrar no completados";
      this.listPayments = this.listTemp;
    }

    // console.log(this.listTemp);
    // if (this.flagState) {
    //   this.contentButton = "Mostrar todos";
    //   // this.listPayments = this.listTemp.filter((element) =>
    //   //   !element.status && element.status);
    // }
    // else {
    //   this.contentButton = "Mostrar no completados";
    //   this.listPayments = this.listTemp.filter((element) =>
    //   !element.status);
    // }
  }

  onChangeStatus(todo: Todo, event: any) {
    todo.status = event.target.checked;
    this.editTodo(todo);
  }


  editTodo(todo: Todo) {
    console.log(todo);
    this.todoService.updateTodo(todo).subscribe(
      (response) => {
        if (response) {
          //  alert('todo creado satisfactoriamente');
        }
      },
      (error) => {
        // alert('No se pudo crear el todo');
      }
    );
  }
}

