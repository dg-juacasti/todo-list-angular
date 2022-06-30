import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;
  edit: boolean;
  selectedTodo: import("/workspace/todo-list-angular/src/app/todo-list/interfaces/todo").Todo;

  constructor(
    private readonly fb: FormBuilder, private todoService:TodoService,private router:Router,
    private state: StateService) {
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
    this.state.todoSelect$.subscribe(todo=>{
     
      if(todo){
        this.selectedTodo = todo;
        this.edit =true;
        this.frmTodo.get('descriptionTodo').setValue(todo.description);
        this.frmTodo.get('finishAt').setValue(new Date());
      } else{
        this.edit =false;
      }
    })
  }

  onClickAdd() {
    if(this.edit){
      this.todoService.editTodo({
        description:this.frmTodo.get('descriptionTodo').value,
      finish_at:this.frmTodo.get('finishAt').value,
      id_author:11,
      
      status: this.selectedTodo.status,
      },this.selectedTodo.id).subscribe(resp=>{
        this.router.navigateByUrl('');
      });
      return;
    }
    this.todoService.addTodo({
      description:this.frmTodo.get('descriptionTodo').value,
      finish_at:this.frmTodo.get('finishAt').value,
      id_author:11,
      status:0     
    }).subscribe(resp=>{
      this.router.navigateByUrl('');
    });
  }


}
