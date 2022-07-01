import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TodoWrapperComponent } from "./todo-list/components/todo-wrapper/todo-wrapper.component";
import { TodoService } from "./todo-list/services/todo.service";
import { StateService } from "./todo-list/services/state.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ResponseTodo } from "./todo-list/interfaces/response";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { AddTodoComponent } from "./todo-list/components/add-todo/add-todo.component";
import { TodoFilterPipe } from "./todo-list/pipes";
import { ProgressBarComponent } from "./shared/components/molecules/progress-bar/progress-bar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const todoListResponse: ResponseTodo = {
  success: true,
  type: "task_rows",
  data: [
    {
      id: 26,
      description: "Nueva tarea",
      status: 1,
      id_author: 1,
      finish_at: "2022-06-24T00:00:00.000Z",
      created_at: "2022-06-14T12:06:38.000Z",
    },
    {
      id: 28,
      description: "Nuevo Todo",
      status: 0,
      id_author: 1,
      finish_at: "2022-06-16T00:00:00.000Z",
      created_at: "2022-06-14T13:14:08.000Z",
    },
  ],
};

const createTodoResponse: ResponseTodo = {
  success: true,
  type: "task_rows",
  data: {},
};

const updateTodoResponse: ResponseTodo = {
  success: true,
  type: "task_rows",
  data: {},
};

const deleteTodoResponse: ResponseTodo = {
  success: true,
  type: "task_rows",
  data: {},
};

describe("TodoList App Test", () => {
  let todoWrapperComponent: TodoWrapperComponent;
  let fixtureTodoWrapper: ComponentFixture<TodoWrapperComponent>;
  let progressBarComponent: ProgressBarComponent;
  let fixtureProgressBar: ComponentFixture<ProgressBarComponent>;
  let addTodoComponent: AddTodoComponent;
  let fixtureAddTodo: ComponentFixture<AddTodoComponent>;
  let todoService: TodoService;
  let stateService: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "", component: TodoWrapperComponent },
          { path: "todo", component: AddTodoComponent },
        ]),
      ],
      declarations: [
        TodoWrapperComponent,
        AddTodoComponent,
        TodoFilterPipe,
        ProgressBarComponent,
      ],
      providers: [TodoService, StateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixtureTodoWrapper = TestBed.createComponent(TodoWrapperComponent);
    todoWrapperComponent = fixtureTodoWrapper.componentInstance;
    fixtureTodoWrapper.detectChanges();
    todoService = fixtureTodoWrapper.debugElement.injector.get(TodoService);
    stateService = fixtureTodoWrapper.debugElement.injector.get(StateService);
  });

  beforeEach(() => {
    jest
      .spyOn(todoService, "getTodoList")
      .mockImplementation(() => of(todoListResponse));

    jest
      .spyOn(todoService, "createTodo")
      .mockImplementation(() => of(createTodoResponse));

    jest
      .spyOn(todoService, "updateTodo")
      .mockImplementation(() => of(updateTodoResponse));

    jest
      .spyOn(todoService, "deleteTodo")
      .mockImplementation(() => of(deleteTodoResponse));
  });

  beforeEach(() => {
    fixtureProgressBar = TestBed.createComponent(ProgressBarComponent);
    progressBarComponent = fixtureProgressBar.componentInstance;
    fixtureProgressBar.detectChanges();
  });

  beforeEach(() => {
    fixtureAddTodo = TestBed.createComponent(AddTodoComponent);
    addTodoComponent = fixtureAddTodo.componentInstance;
    fixtureAddTodo.detectChanges();
  });

  afterEach(() => {
    fixtureTodoWrapper.destroy();
    fixtureProgressBar.destroy();
    fixtureAddTodo.destroy();
    jest.resetAllMocks();
  });

  /* Tests */

  it("should create TodoWrapperComponent", () => {
    expect(todoWrapperComponent).toBeTruthy();
  });

  it("Should create a new todo", async () => {
    const spy = jest.spyOn(todoService, "createTodo");

    addTodoComponent.frmTodo.patchValue({
      description: "description",
      finishAt: "2022-06-24T00:00:00.000Z",
    });

    addTodoComponent.createTodo();

    expect(spy).toHaveBeenCalled();
  });

  /**
   *
   * Probar que el formulario muestre los mensajes de requerimiento cuando
   * el formulario no tenga la descripción y la fecha ingresada
   */
  it("Should validate the todo form, description and date required", async () => {
    addTodoComponent.frmTodo.patchValue({
      description: "",
      finishAt: "",
    });

    Object.values(addTodoComponent.frmTodo.controls).forEach((control) => {
      control.markAsTouched();
    });

    expect(addTodoComponent.descriptionErrorMessage).toEqual(
      "Descripción en requerida"
    );
    expect(addTodoComponent.dateErrorMessage).toEqual(
      "Fecha límite es requerida"
    );
  });

  it("Should update a todo, description and date", async () => {
    const spy = jest.spyOn(todoService, "updateTodo");

    stateService.setTodoSelected(todoListResponse.data[0]);

    addTodoComponent.frmTodo.patchValue({
      description: "description updated",
      finishAt: "2022-06-24T00:00:00.000Z",
    });

    addTodoComponent.updateTodo();

    expect(spy).toHaveBeenCalled();
  });

  it("Should delete a todo", async () => {
    const spy = jest.spyOn(todoService, "deleteTodo");
    todoWrapperComponent.deleteTodo(1);
    expect(spy).toHaveBeenCalled();
  });

  it("Should update the todo status ", async () => {
    const spy = jest.spyOn(todoService, "updateTodo");
    todoWrapperComponent.onChangeStatus(todoListResponse.data[0]);
    expect(spy).toHaveBeenCalled();
  });

  it("Should show an message when the todo list is empty  ", async () => {
    todoWrapperComponent.listPayments = [];
    expect(todoWrapperComponent.noTasksMessage).toEqual(
      "No tienes tareas registradas"
    );
  });

  /**
   *
   * Probar que la barra de estado cambia cuando se completa una tarea
   * se puede probar por el cambio en texto o por porcentaje de completitud
   */
  it("Should the progress bar change its label text or percentage when a todo is completed ", async () => {
    progressBarComponent.completedTasks = 5;
    progressBarComponent.totalTasks = 10;
    expect(progressBarComponent.percentage).toEqual(`50%`);
  });

  /**
   *
   * Probar el filtro de las tareas por descripcion
   */
  it("Should filter the todo list by description", async () => {
    const pipe = new TodoFilterPipe();
    const result = pipe.transform(todoListResponse.data, "Nuevo Todo", false);
    expect(result).toHaveLength(1);
  });

  /**
   *
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente
   * sobre el boton del filtro se muestren todos la lista nuevamente
   */
  it("Should filter the todo list by completed status and toggle functionality button", async () => {
    todoWrapperComponent.applyStatusFilter();
    expect(todoWrapperComponent.isShowingAllTodos).toBeFalsy();
    expect(todoWrapperComponent.statusFilterButtonText).toBe("Mostrar todos");
  });

  /* extra tests */

  it("Should onClickAdd in add Todo component call updateTodo if a todo is going to be updated", async () => {
    const spy = jest.spyOn(addTodoComponent, "updateTodo");
    stateService.setTodoSelected(todoListResponse.data[0]);
    addTodoComponent.onClickAdd();
    expect(spy).toHaveBeenCalled();
  });

  it("Should onClickAdd in add Todo component call createTodo if a new todo is being created", async () => {
    const spy = jest.spyOn(addTodoComponent, "createTodo");
    stateService.setTodoSelected(undefined);
    addTodoComponent.onClickAdd();
    expect(spy).toHaveBeenCalled();
  });

  it("Should buttonText in add Todo component return the correct text to update", async () => {
    stateService.setTodoSelected(todoListResponse.data[0]);
    expect(addTodoComponent.buttonText).toEqual("Actualizar");
  });
});
