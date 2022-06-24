import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { ResponseTodo } from '../../interfaces/response';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  interfTodo:ResponseTodo={
    success: true,
    type:'',
    data:[]
    
  };
  public idtask:number

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
  }

  onChangeStatus(todo: Todo) {
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  delTask(idtask:number,confirmacion:boolean)
  {
    confirmacion=confirm("Seguro de eliminar ")
    if (confirmacion)
    {
      this.todoService.delTodoLista (idtask).subscribe(datos=>
        {
        alert("Tarea eliminado...");
        }) 
    }
  }

  updateTask()
  {
    
    this.todoService.updTodoList(this.interfTodo,this.idtask).subscribe(datos=>
      {
      alert("Heroe Actualizado")
    })

  }
}
