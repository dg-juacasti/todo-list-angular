import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  listPayments: Todo[] = [];
  listPayment : Todo;
  public frmTodo: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private  _activateRouter: ActivatedRoute,
    private router: Router,
    private readonly todoService: TodoService,
    private readonly state: StateService,
    ) {
  }
  idTarea: number;
  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });

    this._activateRouter.queryParams.subscribe(
      params=>{
        this.idTarea = params['idTarea'];
        this.obtenerTodoListLocal();
        this.frmTodo.controls['descriptionTodo'].setValue(this.listPayment.description);
        this.frmTodo.controls['finishAt'].setValue( this.listPayment.finish_at);
      }
    );

  }

  
  
  onClickAdd() {

    if (this.listPayment){
      this.listPayment ={
        description: this.frmTodo.value.descriptionTodo,
        status : 0,
        id_author:31,
        finish_at : this.frmTodo.value.finishAt
      }
      this.todoService.createTodoList(this.listPayment).subscribe();
    } else {
      this.listPayment ={
        description: this.frmTodo.value.descriptionTodo,
        status : 1,
        id_author:31,
        finish_at : this.frmTodo.value.finishAt
      }
      this.todoService.updateTodoList(this.listPayment).subscribe();
    }
  }
  onClickReturn(){
    this.router.navigate(['']);
  }
  obtenerTodoListLocal(){
    this.listPayment = JSON.parse(localStorage.getItem('listPayments'));
  }
  get form(){
    return this.frmTodo?.controls;
 }
  
}
