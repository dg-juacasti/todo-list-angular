import { formatDate, Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Todo } from "../../interfaces";
import { StateService, TodoService } from "../../services";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.scss"],
})
export class AddTodoComponent implements OnInit, OnDestroy {
  public frmTodo: FormGroup;

  selectedTodo: Todo;

  onDestroy$ = new Subject();

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _todoService: TodoService,
    private readonly _stateService: StateService,
    private readonly _location: Location
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.frmTodo = this._fb.group({
      description: ["", [Validators.maxLength(50), Validators.required]],
      finishAt: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.onSelectedTodoChange();
  }

  onSelectedTodoChange() {
    this._stateService.todoSelected$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((todo) => {
        this.selectedTodo = todo;

        if (this.selectedTodo) {
          const { description, finish_at } = this.selectedTodo;

          this.frmTodo.patchValue({
            description,
            finishAt: formatDate(finish_at, "yyyy-MM-dd", "en"),
          });
        }
      });
  }

  onClickAdd() {
    if (this.selectedTodo) {
      this.updateTodo();
    } else {
      this.createTodo();
    }
  }

  createTodo() {
    const { description, finishAt } = this.frmTodo.value;

    const newTodo: Todo = {
      description,
      finish_at: finishAt,
      id_author: 4,
      status: 0,
    };

    this._todoService.createTodo(newTodo).subscribe((data) => {
      if (data.success) {
        this.navigateBack();
      }
    });
  }

  updateTodo() {
    const { description, finishAt } = this.frmTodo.value;
    const { status, id, created_at } = this.selectedTodo;

    const updatedTodo: Todo = {
      description,
      finish_at: finishAt,
      id_author: 4,
      created_at,
      status,
      id,
    };

    this._todoService.updateTodo(id, updatedTodo).subscribe((data) => {
      if (data.success) {
        this.navigateBack();
      }
    });
  }

  navigateBack() {
    this._location.back();
    this._stateService.setTodoSelected(undefined);
  }

  get isFormInvalid(): boolean {
    return this.frmTodo.invalid;
  }

  get buttonText(): string {
    return this.selectedTodo ? "Actualizar" : "Agregar";
  }

  get descriptionErrorMessage(): string {
    return this.frmTodo.get("description").errors &&
      this.frmTodo.get("description").touched
      ? "Descripción en requerida"
      : "";
  }

  get dateErrorMessage(): string {
    return this.frmTodo.get("finishAt").errors &&
      this.frmTodo.get("finishAt").touched
      ? "Fecha límite es requerida"
      : "";
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  removeListeners() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
