import { Component, OnInit,EventEmitter,Output} from '@angular/core';
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
  description:string = "";

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
    todo.status === 0? todo.status =1:todo.status =0;
  }

  deleteTask(todo:Todo){
    console.log("entro a eliminar..",todo);
    this.todoService.deleteTodoList(todo.id).subscribe((mensaje:any) => 
    {console.log(mensaje.success)
    });
    this.getListTodo();
  }

  editarTask(todo:Todo){
    this.router.navigate(['/todo'], { queryParams: { id: todo.id } });
  }
  addTodo() {
    this.router.navigate(['/todo']);
  }

  realizeSearch(description){
   
    const result = this.listPayments.filter((obj) => {

      return obj.description === description;
    });
    if(result.length >0){
      this.listPayments = result;
    }else{
      this.getListTodo();
    }
    
    console.log ("result",result);
    console.log ("listPayments",this.listPayments);
  }

}
