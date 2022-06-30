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
  todo: Todo;

  constructor(
    
    private readonly fb: FormBuilder,
    private readonly todoService: TodoService,
    private router: Router) {
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.todo = this.router.getCurrentNavigation().extras.state.record;
      console.log(this.todo)
      
    }
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
    if(this.todo?.description){
      this.frmTodo.get('descriptionTodo').setValue(this.todo.description);
      this.frmTodo.get('finishAt').setValue(new Date(this.todo.finish_at));
    }
  }

  onClickAdd() {
    const entrada = {
      description: this.frmTodo.get('descriptionTodo').value,
      finishAt: this.frmTodo.get('finishAt').value
    }


    if(this.todo){
      this.todoService.editRecord(entrada,this.todo.id,this.todo.status).subscribe(
        res => {
          this.frmTodo.reset();
        })

    }else{

      this.todoService.addRecord(entrada).subscribe(
        res => {
          this.frmTodo.reset();
        });
    }

    

  }


}
