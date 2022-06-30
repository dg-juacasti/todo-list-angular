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
  listBackUp: Todo[] = [];
  listCompleted: number = 0;
  filter: boolean = false;
  filterTitle: string = 'Show NO completed';
  searchText: string = "";
  frmTodo: FormGroup;

  private initForm() {
    return this.fb.group({
      description: [null, [Validators.maxLength(50), Validators.required]],
      finish_at: [null, [Validators.required]],
      status: [0],
      id_author: [9],
    });
  }

  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router,
    private readonly fb: FormBuilder
  ) {
    this.frmTodo = this.initForm();
  }

  ngOnInit(): void {
    // this.frmTodo = this.fb.group({
    //   descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
    //   finishAt: [null, [Validators.required]]
    // });

    // this.getListTodo();
    // this.state.todoList$.subscribe(resp => this.listPayments = resp);
    this.getTodoListAll();
  }

  // getListTodo() {
  //   this.todoService.getTodoList().subscribe(() => {
  //     this.state.todoList$.subscribe(resp => this.listPayments = resp);
  //   });
  // }


  getTodoListAll() {
    this.todoService.getTodoList().subscribe(res => {
      this.listPayments = res.data;
      this.listBackUp = this.listPayments;
      this.listCompleted = this.listBackUp.filter(todo => todo.status).length;
    });
  }


  onChangeStatus(todo: Todo) {
    todo.status = todo.status === 0 ? 1 : 0;
    this.updateTodo(todo);
  }

  addTodo() {
    localStorage.removeItem('data');
    this.router.navigate(['/todo']);
  }

  updateTask(data: Todo) {
    localStorage.setItem('data', JSON.stringify(data));
    this.router.navigate(['/todo']);
  }

  deleteTask(id: number) {
    this.todoService.deleteTodo(id).subscribe(res => {
      console.log('Deleted...');
      this.getTodoListAll();
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(res => {
      console.log('Update status:', res);
      this.getTodoListAll();
    });
  }

  searchCharacter(searchTxt: string) {
    this.searchText = searchTxt;
  }


  filterTask() {
    this.listPayments = !this.filter ? this.listBackUp.filter(todo => !todo.status) : this.listBackUp;
    this.filter = !this.filter;
    this.filterTitle = !this.filter ? 'Show NO completed' : 'Show All';
  }

}
