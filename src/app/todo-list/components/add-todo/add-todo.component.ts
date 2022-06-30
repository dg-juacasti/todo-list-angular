import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Constants } from 'src/app/config/constants.enum';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;
  public isEdit: boolean = false;
  public todoEdit: Todo;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly todoService: TodoService,
    private readonly router: Router,
    private readonly state: StateService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.state.todoSelect$
      .pipe(takeUntil(this.destroy$))
      .subscribe(todo => this.fillForm(todo));

  }
  initForm() {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
  }

  fillForm(todo: Todo) {
    if (todo) {
      this.frmTodo.controls.descriptionTodo.setValue(todo.description);
      const date = todo.finish_at.split('T');
      this.frmTodo.controls.finishAt.setValue(date[0]);
      this.isEdit = true;
      this.todoEdit = todo;
    }
  }

  onClickAdd() {
    const todo: Todo = this.fillTodo();
    this.todoService.addTodoList(todo).subscribe(res => {
      if (res.success) {
        this.onClickBack();
      }
    })
  }

  onClickEdit() {
    const todo: Todo = this.fillTodoEdit();
    this.todoService.editTodoList(todo).subscribe(res => {
      if (res.success) {
        this.onClickBack();
      }
    })
  }

  fillTodo() {
    const todo = {
      description: this.frmTodo.value.descriptionTodo,
      finish_at: this.frmTodo.value.finishAt,
      status: 0,
      id_author: Constants.ID_AUTOR
    }
    return todo;
  }

  fillTodoEdit() {
    this.todoEdit.description = this.frmTodo.value.descriptionTodo;
    this.todoEdit.finish_at = this.frmTodo.value.finishAt;
    return this.todoEdit;
  }

  onClickBack() {
    this.state.setTodoSelect(undefined);
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
