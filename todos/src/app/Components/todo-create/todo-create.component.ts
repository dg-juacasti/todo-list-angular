import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoInterface } from '../todo-interface';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  todoForm:FormGroup;
  TodoEntity:TodoInterface={
    description: null,
    status: 0,
    id_author: 1,
    finish_at: '2022-06-03T21:47:23.000Z'
  };
  success:boolean=null;
  constructor(private service:TodoServiceService, private router:Router, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {

    this.todoForm=new FormGroup({
      'description':new FormControl("",[Validators.required,Validators.maxLength(50)]),
      'finish_at':new FormControl("",Validators.required)
    });
  }

  create(){

    this.TodoEntity.description=this.todoForm.value.description
    this.TodoEntity.finish_at=this.todoForm.value.finish_at
    console.log(this.TodoEntity);

    this.service.Create(this.TodoEntity).subscribe(data=>{if(data){
      console.log(data);
      this.success=true;
      console.warn("Agregado")
    }},err=>{console.log(err)})

  }

}
