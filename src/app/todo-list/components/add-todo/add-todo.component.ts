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
  private dataTodo: Todo;
  private initForm() {
    return this.fb.group({
      description: [null, [Validators.maxLength(50), Validators.required]],
      finish_at: [null, [Validators.required]],
      status: [0],
      id_author: [9],
    });
  }

  constructor(
    private readonly fb: FormBuilder,
    private todoService: TodoService,
    private router: Router,
  ) {
    this.frmTodo = this.initForm();
  }

  ngOnInit(): void {
    this.validateData();
  }

  onClickAdd() {
    // this.postTodo();
    this.validateAction();
  }

  postTodo() {
    const data = this.frmTodo.value;
    this.todoService.postTodo(data).subscribe(res => {
      console.log('POST RES:', res);
      this.resetForm();
      this.router.navigate(['/']);
    });
  }

  validateAction() {
    if (this.dataTodo) {
      this.updateTodo();
    } else {
      this.postTodo();
    }
  }

  validateData() {
    this.dataTodo = JSON.parse(localStorage.getItem('data'));
    console.log('DATA', this.dataTodo);
    if (this.dataTodo) {
      const year = new Date(this.dataTodo.finish_at).getFullYear();
      const month = new Date(this.dataTodo.finish_at).getMonth() + 1;
      const day = new Date(this.dataTodo.finish_at).getDate();
      const dateSelected = `${year}-${month > 10 ? month : "0" + month}-${day > 10 ? day : "0" + month}`;
      console.log('DATE:', dateSelected);
      this.frmTodo.get('description').setValue(this.dataTodo.description);
      this.frmTodo.get('finish_at').setValue(dateSelected);
    }
  }

  updateTodo() {
    this.dataTodo.description = this.frmTodo.value.description;
    this.dataTodo.finish_at = new Date(this.frmTodo.value.finish_at).toISOString();
    console.log('Update new data:', this.dataTodo);

    this.todoService.updateTodo(this.dataTodo).subscribe(res => {
      console.log('UPDATE RES:', res);
      this.resetForm();
      this.router.navigate(['/']);
    });
  }

  resetForm() {
    this.frmTodo.reset();
    localStorage.removeItem('data');
    this.dataTodo = null;
  }

  goBack() {
    this.router.navigate(['/']);
  }


}
