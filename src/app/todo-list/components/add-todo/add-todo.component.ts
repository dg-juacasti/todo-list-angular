import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;
  todo :Todo;

  constructor(
    private readonly fb: FormBuilder,
    private readonly todoService: TodoService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
   console.log("Ingresa a anadir todo");

let descriptionTodo = this.frmTodo.get("descriptionTodo").value;
let finishAt = this.frmTodo.get("finishAt").value;

this.todo = new Todo();

this.todo.description = descriptionTodo;
this.todo.finish_at =finishAt;
this.todo.status=0;
this.todo.id_author=13;



this.todoService.addTodoList(this.todo).subscribe((resultado)=>{
  console.log("RESULTADO:"+resultado);
 
  });
  }

  descripcionTodo(descripcion:string) {
    console.log("Valor de la descripcion:" +descripcion);

  }

  onClickRegresar() {
    console.log("Presiono el boton regresar" );

    this.router.navigate(['/']);
  }

}
