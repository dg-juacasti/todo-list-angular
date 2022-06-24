import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  frmTodo = this.fb.group({
    descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
    finishAt: [null, [Validators.required]]
  });
  resp: Todo[];
  filterStatus = false;
  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => {
      this.resp = resp;
      this.listPayments = this.resp;
    });
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onChangeStatus(todo: Todo) {
    todo.status === 1?todo.status = 0:todo.status = 1;
    this.todoService.editTodo(todo, todo.id).subscribe(resp=>{});
  }

  addTodo() {
    this.state.setTodoSelect(undefined);
    this.router.navigate(['/todo']);
  }
  filterTodo(event:any){
    const filter = this.frmTodo.get('descriptionTodo').value;
    this.listPayments = this.resp.filter(todo=>todo.description.includes(filter));

  }
 getCompletedStatus(){

  return  this.listPayments && this.listPayments.length ? this.listPayments.filter(todo=>todo.status===1).length:0;
 }
 filterTodoStatus(){
  this.filterStatus = !this.filterStatus;
  this.filterStatus? this.listPayments=this.resp.filter(todo=>todo.status===1):this.listPayments=this.resp;
 }
 deleteTodo(id:number){
  this.todoService.deleteTodo(id).subscribe(resp=>{
    this.getListTodo();
  });
  
 }

 editTodo(todo:Todo){
  this.state.setTodoSelect(todo);
  this.router.navigate(['/todo']);
 }
}
