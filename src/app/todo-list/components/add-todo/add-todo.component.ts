import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  @Input() tareaEditar: Todo;

  public frmTodo: FormGroup;

  constructor(
    private readonly fb: FormBuilder, private service: TodoService, private router: Router) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]], //'Descripcion es requerida'
      finishAt: [, [Validators.required]] //'Fecha limite es requerida'
    });
  }

  onClickVolver() {
    this.router.navigate(['/tareas']);
  }
  onClickAdd() {
    var tarea: Todo =  {
      id_author: 32,
      status: 0,
      description: '',
      finish_at: ''
    };
    tarea.description = this.frmTodo.value["descriptionTodo"];
    const valor: string = this.frmTodo.value["finishAt"];
    tarea.finish_at = valor;
    console.log(tarea);
    this.service.postCrearTarea(tarea).subscribe((dato:any) => {
      console.log(dato);
    });
  }

  editTarea(){
    console.log(this.tareaEditar);
  }

}
