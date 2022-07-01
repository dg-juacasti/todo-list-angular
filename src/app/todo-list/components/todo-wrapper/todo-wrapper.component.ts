import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TodoService, StateService } from "../../services";
import { Todo } from "../../interfaces";
import { FormControl } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-todo-wrapper",
  templateUrl: "./todo-wrapper.component.html",
  styleUrls: ["./todo-wrapper.component.scss"],
})
export class TodoWrapperComponent implements OnInit, OnDestroy {
  listPayments: Todo[] = [];
  searchDescription: FormControl = new FormControl("");

  isShowingAllTodos: boolean = true;
  onDestroy$ = new Subject();

  constructor(
    private readonly _todoService: TodoService,
    private readonly _state: StateService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.getTodoList();
    this.onTodoListChange();
  }

  getTodoList() {
    this._todoService.getTodoList().subscribe();
  }

  onTodoListChange() {
    this._state.todoList$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((resp) => (this.listPayments = resp));
  }

  onChangeStatus(todo: Todo) {
    const updatedTodo: Todo = {
      ...todo,
      status: todo.status === 0 ? 1 : 0,
    };

    this._todoService
      .updateTodo(updatedTodo.id, updatedTodo)
      .subscribe((data) => {
        if (data.success) {
          this.getTodoList();
        }
      });
  }

  addTodo() {
    this._router.navigate(["/todo"]);
  }

  startUpdateTodo(todo: Todo) {
    this._state.setTodoSelected(todo);
    this._router.navigate(["/todo"]);
  }

  deleteTodo(id: number) {
    this._todoService.deleteTodo(id).subscribe((data) => {
      if (data.success) {
        this.getTodoList();
      }
    });
  }

  applyStatusFilter() {
    this.isShowingAllTodos = !this.isShowingAllTodos;
  }

  get searchInputText(): string {
    return this.searchDescription.value;
  }

  get statusFilterButtonText(): string {
    return this.isShowingAllTodos ? "Mostrar no completados" : "Mostrar todos";
  }

  get totalTasksNumber(): number {
    return this.listPayments.length;
  }

  get completedTasksNumber(): number {
    return this.listPayments.filter((todo) => todo.status === 1).length;
  }

  get noTasksMessage(): string {
    return !this.totalTasksNumber || this.totalTasksNumber === 0
      ? "No tienes tareas registradas"
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
