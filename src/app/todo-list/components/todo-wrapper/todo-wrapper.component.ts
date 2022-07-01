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
  busqueda:string='';
  tamanoRegistros:boolean;
  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router) {


    this.tamanoRegistros=false;
     }

  ngOnInit(): void {
    
    this.getListTodo();
    this.state.todoList$.subscribe((resp) => {this.listPayments = resp
      
      if (this.listPayments) {
        console.log("1");
        this.tamanoRegistros = true;
      } else {
  
        console.log("2");
        this.tamanoRegistros = false;
      }
      
      }  );
      
  }

  getListTodo() {
    console.log("Ingresa a Obtener Toda la lista")
    this.todoService.getTodoList().subscribe();
  /*  if (this.listPayments.length==0) {
      console.log("1");
      this.tamanoRegistros = true;
    } else {

      console.log("2");
      this.tamanoRegistros = false;
    }*/
  }

  onChangeStatus(todo: Todo) {
    todo.status=0;
    todo.finish_at="2022-06-03T21:47:23.000Z";


  
this.todoService.Update(todo, todo.id).subscribe((resultado)=>{
console.log("RESULTADO UPDATE:"+resultado);
//this.getListTodo() ;
});



  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  eliminarTarea(id:string ){
    console.log("Id para elimiar:"+id);

    console.log("Ingresa a elimianr tarea");

    this.todoService.deleteTodoList(id).subscribe((resultado)=>{
      this.getListTodo();
      
      
      
      
      });
  }

  

}
