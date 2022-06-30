import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  show=false;
  public frmTodo: FormGroup;
  fullList: Todo[];
  filterStatus: boolean;
  completed: number;

  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
    this.getListTodo();
    this.state.todoList$.subscribe(resp => {
      this.listPayments = resp
      this.fullList = resp
      if(resp)
      this.completed = (resp.filter(x=> x.status === 1)).length;
    
    });
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe(
      res=>{
        if(res.data.length == 0){
          this.show=true
        }else{
          this.show= false
        }
      }
    );
  }

  onChangeStatus(todo: Todo) {
    const entrada = {
      description: todo.description,
      finishAt: todo.finish_at
    }
    todo.status === 1?todo.status = 0:todo.status = 1;
    this.todoService.editRecord(entrada,todo.id,todo.status).subscribe(
      res => {
        this.frmTodo.reset();
      })
      this.completed = (this.fullList.filter(x=> x.status === 1)).length;
  }


  filterTodo(event:any){
    const filter = this.frmTodo.get('descriptionTodo').value;
    this.listPayments = this.fullList.filter(todo=>todo.description.includes(filter));
  }

  filterTodoStatus(){
    this.filterStatus = !this.filterStatus;
    this.filterStatus? this.listPayments=this.fullList.filter(todo=>todo.status===1):this.listPayments=this.fullList;
   }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  editar(record: Todo){

    this.router.navigate(['/todo/'],
      {
        state: {          
          record: record
        }
      }

    );
  }

  eliminar(record:Todo){
    this.todoService.deleteRecord(record.id)
    .subscribe(res=>{
      this.getListTodo();
    })
  }

}
