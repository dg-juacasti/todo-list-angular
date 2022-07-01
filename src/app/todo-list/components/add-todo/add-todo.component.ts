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

  constructor(
    private readonly fb: FormBuilder,
    private readonly todoService: TodoService,
    ) {
      
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  onClickAdd() {
   /*  this.todoService.createTask(this.listPayments).subscribe(dataTask => {
        alert("Datos guardados con éxito...");
   }); */
  }

  onClickReturn()
  {

  }


}
