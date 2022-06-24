import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  public frmTodo: FormGroup;
  hayResgistros: boolean = false;


  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router,
    private readonly fb: FormBuilder) { }
    
  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => {
      this.listPayments = resp;
      this.hayResgistros = false;
      console.log(this.listPayments);
      if(this.listPayments===undefined)
      {
        this.hayResgistros = true;
      }    
    });     
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onChangeStatus(todo: Todo) {
  }

  onFindFilter(task: string){
    
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

}
