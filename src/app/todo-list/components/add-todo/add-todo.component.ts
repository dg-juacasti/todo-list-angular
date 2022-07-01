import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea,actualizarTarea} from '../../interfaces/addTarea';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  

  public frmTodo: FormGroup;
  tarea : Tarea = new Tarea();

  constructor(private readonly fb: FormBuilder, private agregar:TodoService) {
     this.tarea.description="TAREAS DE PRUEBA";
      this.tarea.id_author=29;
      this.tarea.status=0;
      this.tarea.finish_at=new Date(Date.now()).toISOString();

  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
this.agregar.registrarTarea(this.tarea).subscribe(dato=> {
  this.agregar.getTodoList();},error => console.log(error));
  
  }

  onSubmit(){
    this.onClickAdd();
  }
}
