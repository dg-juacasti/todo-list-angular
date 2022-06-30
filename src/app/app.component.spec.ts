import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoWrapperComponent } from "./todo-list/components/todo-wrapper/todo-wrapper.component";
import { TodoService } from "./todo-list/services/todo.service";
import { StateService } from "./todo-list/services/state.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ResponseTodo } from "./todo-list/interfaces/response";
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs';
import { AddTodoComponent } from "./todo-list/components/add-todo/add-todo.component";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

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

describe('TodoList App Test', () => {

  let todoWrapperComponent: TodoWrapperComponent;
  let fixture: ComponentFixture<TodoWrapperComponent>;
  let todoService: TodoService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: TodoWrapperComponent },
          { path: 'todo', component: AddTodoComponent }
        ]),
      ],
      declarations: [
        TodoWrapperComponent,
        AddTodoComponent
      ],
      providers: [
        TodoService,
        StateService,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoWrapperComponent);
    todoWrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    todoService = fixture.debugElement.injector.get(TodoService);
    jest.spyOn(todoService, 'getTodoList').mockImplementation(() => of(todoListResponse));
  });

  afterEach(() => {
    fixture.destroy();
    jest.resetAllMocks();
  });

  it('should create TodoWrapperComponent', () => {
    expect(todoWrapperComponent).toBeTruthy();
  });

  it('Should create a new todo', async () => {
    todoWrapperComponent.addTodo();
   // expect(location.pathname).toBe('/todo');
  })

  /**
  *
  * Probar que el formulario muestre los mensajes de requerimiento cuando
  * el formulario no tenga la descripción y la fecha ingresada
 */
  it('Should validate the todo form, description and date required', async () => {
    const fixture = TestBed.createComponent(AddTodoComponent);
    const addtodocomponent = fixture.componentInstance;
    addtodocomponent.ngOnInit();
    fixture.detectChanges();
    let errors = addtodocomponent.frmTodo.get('descriptionTodo').errors;
    expect({"required": true}).toEqual(errors);
     errors = addtodocomponent.frmTodo.get('finishAt').errors;
    expect({"required": true}).toEqual(errors);

  })
  it('Should update a todo, description and date', async () => {

  })
  it('Should delete a todo', async () => {
  })

  /**
  *
  * Probar que el formulario muestre los mensajes de requerimiento cuando
  * el formulario no tenga la descripción y la fecha ingresada
 */
  it('Should update the todo status ', async () => {
  })
  it('Should show an message when  the todo list is empty  ', async () => {
    todoWrapperComponent.listPayments = [];
    fixture.detectChanges();
    const div = fixture.debugElement.nativeElement.querySelector('#todoEmpty');
    expect(div.innerHTML).toContain('No tienes tareas registradas');
  })

  /**
  *
  * Probar que la barra de estado cambia cuando se completa una tarea
  * se puede probar por el cambio en texto o por porcentaje de completitud
 */
  it('Should the progress bar change its label text or percentage when a todo is completed ', async () => {
  })

  /**
   *
   * Probar el filtro de las tareas por descripcion
  */
  it('Should filter the todo list by description', async () => {
    todoWrapperComponent.frmTodo
    todoWrapperComponent.filterTodo(undefined);
  })

  /**
   *
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente
   * sobre el boton del filtro se muestren todos la lista nuevamente
  */
  it('Should filter the todo list by completed status and toggle functionality button', async () => {
  })

});