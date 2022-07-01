import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetallInterface } from '../Getall-interface';
import { TodoInterface } from '../todo-interface';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-getall',
  templateUrl: './todo-getall.component.html',
  styleUrls: ['./todo-getall.component.css']
})
export class TodoGetallComponent implements OnInit {

  count=0
  listTodo:TodoInterface[];
  constructor(private service:TodoServiceService) { }

  ngOnInit(): void {

    this.service.GetAll().subscribe(data=>{this.listTodo=data.data; this.listTodo.forEach(element => {
      if(element.status==0){
        this.count+=1

      }
      
    });})

  }

}
