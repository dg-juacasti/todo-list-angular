import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseTodo } from '../../interfaces/response';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  interfTodo:ResponseTodo={
    success: true,
    type:'',
    data:[]
    
  }
/* 
  interfaceTodo:Todo={
    
    id_author: 23,
    status: 1,
    description: '',
    finish_at: '2022-06-24',
    created_at: '2022-06-24'
  } */
  public frmTodo: FormGroup;

  constructor(private Servicio: TodoService,
    private readonly fb: FormBuilder
    ) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
    this.Servicio.addTodoList(this.interfTodo).subscribe(datos=>{
    })

  }


}
