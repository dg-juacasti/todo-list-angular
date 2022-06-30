import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoWrapperComponent } from "./todo-list/components/todo-wrapper/todo-wrapper.component";
import { TodoService } from "./todo-list/services/todo.service";
import { StateService } from "./todo-list/services/state.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ResponseAddTodo, ResponseTodo } from "./todo-list/interfaces/response";
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs';
import { AddTodoComponent } from "./todo-list/components/add-todo/add-todo.component";
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { Todo } from "./todo-list/interfaces/todo";

const todoListResponse: ResponseTodo = {
  success: true,
  type: 'task_rows',
  data: [
    {
      id: 26,
      description: 'Nueva tarea',
      status: 1,
      id_author: 1,
      finish_at: '2022-06-24T00:00:00.000Z',
      created_at: '2022-06-14T12:06:38.000Z',
    },
    {
      id: 28,
      description: 'Nuevo Todo',
      status: 0,
      id_author: 1,
      finish_at: '2022-06-16T00:00:00.000Z',
      created_at: '2022-06-14T13:14:08.000Z',
    },
  ],
};

const todoAddResponse: ResponseAddTodo = {
  success: true,
  type: 'task_rows',
  data: 
    {
      id: 26,
      description: 'Nueva tarea',
      status: 1,
      id_author: 1,
      finish_at: '2022-06-24T00:00:00.000Z',
      created_at: '2022-06-14T12:06:38.000Z',
    },
};

const todo: Todo = 
    {
      id: 26,
      description: 'Nueva tarea',
      status: 1,
      id_author: 1,
      finish_at: '2022-06-24T00:00:00.000Z',
      created_at: '2022-06-14T12:06:38.000Z',
    }


describe('TodoList App Test', () => {

  let todoWrapperComponent: TodoWrapperComponent;
  let fixture: ComponentFixture<TodoWrapperComponent>;
  let todoService: TodoService;
  let router: Router;
  let state: StateService;

  let addTodoComponent: AddTodoComponent;
  let addTodoComponentFixture: ComponentFixture<AddTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: TodoWrapperComponent },
          { path: 'todo', component: AddTodoComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        TodoWrapperComponent,
        AddTodoComponent
      ],
      providers: [
        TodoService,
        StateService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoWrapperComponent);
    todoWrapperComponent = fixture.componentInstance;
    fixture.detectChanges();

    addTodoComponentFixture = TestBed.createComponent(AddTodoComponent)
    addTodoComponent = addTodoComponentFixture.componentInstance;
    addTodoComponentFixture.detectChanges();

    todoService = fixture.debugElement.injector.get(TodoService);
    jest.spyOn(todoService, 'getTodoList').mockImplementation(() => of(todoListResponse));
    jest.spyOn(todoService, 'addTodoList').mockImplementation(() => of(todoAddResponse));
    jest.spyOn(todoService, 'editTodoList').mockImplementation(() => of(todoAddResponse));
    jest.spyOn(todoService, 'deleteTodoList').mockImplementation(() => of(todoAddResponse));

    
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));

    state = TestBed.inject(StateService);
    jest.spyOn(state, 'setTodoList').mockReturnValue();
    jest.spyOn(state, 'todoList', 'get').mockReturnValue([todo]);

    jest.spyOn(state, 'setTodoSelect').mockReturnValue();
    jest.spyOn(state, 'todoSelect', 'get').mockReturnValue(todo);

  })

  afterEach(() => {
    fixture.destroy();
    addTodoComponentFixture.destroy();

    jest.resetAllMocks();
  });

  it('should create TodoWrapperComponent', () => {
    expect(todoWrapperComponent).toBeTruthy();
  });

  it('Should navigate to /todo for add', async () => {
    todoWrapperComponent.addTodo();
    expect(router.navigate).toHaveBeenCalledWith(['/todo']);
  })

  it('Should create a new todo', ()  => {
    jest.spyOn(addTodoComponent, 'onClickBack');
    addTodoComponent.frmTodo.controls.descriptionTodo.setValue('test');
    addTodoComponent.frmTodo.controls.finishAt.setValue('2022-06-24');
    addTodoComponent.onClickAdd();
    expect(todoService.addTodoList).toHaveBeenCalled();
    expect(addTodoComponent.onClickBack).toHaveBeenCalled();
  })

  /**
  *
  * Probar que el formulario muestre los mensajes de requerimiento cuando
  * el formulario no tenga la descripción y la fecha ingresada
 */
  it('Should validate the todo form, description and date required', async () => {
    addTodoComponent.frmTodo.controls.descriptionTodo.setValue(undefined);
    addTodoComponent.frmTodo.controls.finishAt.setValue(undefined);
    addTodoComponentFixture.detectChanges();
    const dateerror = addTodoComponentFixture.debugElement.query(By.css('#error-date'));
    const descriptionerror = addTodoComponentFixture.debugElement.query(By.css('#error-description'));
    expect(dateerror).toBeDefined();
    expect(descriptionerror).toBeDefined();
  })

  it('Should navigate to /todo for edit', () => {
    todoWrapperComponent.onClickEdit(todo);
    expect(state.setTodoSelect).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/todo']);
  })

  it('Should update a todo, description and date', () => {
    jest.spyOn(addTodoComponent, 'onClickBack');
    addTodoComponent.todoEdit = todo;
    addTodoComponent.frmTodo.controls.descriptionTodo.setValue('test');
    addTodoComponent.frmTodo.controls.finishAt.setValue('2022-06-24');
    addTodoComponent.onClickEdit();
    expect(todoService.editTodoList).toHaveBeenCalled();
    expect(addTodoComponent.onClickBack).toHaveBeenCalled();
  })

  it('Should delete a todo', () => {
    jest.spyOn(todoWrapperComponent, 'getListTodo');
    todoWrapperComponent.onClickDelete(todo);
    expect(todoWrapperComponent.getListTodo).toHaveBeenCalled
  })

  /**
  *
  * Probar que el formulario muestre los mensajes de requerimiento cuando
  * el formulario no tenga la descripción y la fecha ingresada
 */
  it('Should update the todo status ', async () => {
    jest.spyOn(todoWrapperComponent, 'getListTodo');
    todoWrapperComponent.onClickDelete(todo);
    expect(todoService.deleteTodoList).toHaveBeenCalled();
    expect(todoWrapperComponent.getListTodo).toHaveBeenCalled();
  })

  it('Should show an message when  the todo list is empty  ', async () => {
    todoWrapperComponent.listPayments = [];
    const emptylist = fixture.debugElement.query(By.css('#emptylist'));
    expect(emptylist).toBeDefined();
    
  })

  /**
   *
   * Probar el filtro de las tareas por descripcion
  */
  it('Should filter the todo list by description', async () => {
    todoWrapperComponent.listPayments = todoListResponse.data;
    todoWrapperComponent.filter = 'tarea'
    todoWrapperComponent.search();
    expect(todoWrapperComponent.listPayments.length).toBe(1);
  })

  /**
   *
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente
   * sobre el boton del filtro se muestren todos la lista nuevamente
  */
  it('Should filter the todo list by completed status and toggle functionality button', async () => {
    todoWrapperComponent.listPayments = todoListResponse.data;
    todoWrapperComponent.onClicShowAll();
    expect(todoWrapperComponent.listPayments.length).toBe(1);
  })

});