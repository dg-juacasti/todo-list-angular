import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;
  private readonly todoService: TodoService;
  tarea: Todo = {  
      id_author: 19,
      status: 0,
      description: "nuevo",
      finish_at: Date(),
      created_at: Date() 
  };
  

  constructor(
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
    
    console.log(this.tarea);
    this.todoService.addTarea(this.tarea).subscribe(nuevoRegidtro => {
      this.todoService;
      alert("Datos guardados con éxito...");
    } );

  }


}
