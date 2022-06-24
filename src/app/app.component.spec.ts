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

const todoSelect = {
  id: 26,
  description: 'Nueva tarea',
  status: 1,
  id_author: 1,
  finish_at: '2022-06-24T00:00:00.000Z',
  created_at: '2022-06-14T12:06:38.000Z',
}


describe('TodoList App Test', () => {

  let todoWrapperComponent: TodoWrapperComponent;
  let addTodoComponent: AddTodoComponent;
  let fixtureTodo: ComponentFixture<TodoWrapperComponent>;
  let fixtureAddTodo: ComponentFixture<AddTodoComponent>;
  let todoService: TodoService;
  let stateService: StateService;
  let router: Router;

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
    fixtureTodo = TestBed.createComponent(TodoWrapperComponent);
    todoWrapperComponent = fixtureTodo.componentInstance;
    fixtureTodo.detectChanges();
    fixtureAddTodo = TestBed.createComponent(AddTodoComponent);
    addTodoComponent = fixtureAddTodo.componentInstance;
    fixtureAddTodo.detectChanges();
    router = TestBed.inject(Router);
    todoService = fixtureTodo.debugElement.injector.get(TodoService);
    jest.spyOn(todoService, 'getTodoList').mockImplementation(() => of(todoListResponse));
    jest.spyOn(todoService, 'updateTodo').mockImplementation(() => of(todoListResponse));
    jest.spyOn(todoService, 'deleteTodo').mockImplementation(() => of(todoListResponse));
    stateService = fixtureTodo.debugElement.injector.get(StateService);
    jest.spyOn(stateService, 'setTodoSelect')
    jest.spyOn(stateService, 'setTodoList')
  });

  afterEach(() => {
    fixtureTodo.destroy();
    jest.resetAllMocks();
  });

  it('should create TodoWrapperComponent', () => {
    expect(todoWrapperComponent).toBeTruthy();
  });

  it('should create AddTodoComponent', () => {
    expect(addTodoComponent).toBeTruthy();
  });

  it('Should create a new todo', async () => {
    jest.spyOn(router, 'navigate').mockImplementation(() => of(true).toPromise());
    todoWrapperComponent.addTodo();
    expect(router.navigate).toBeCalled()

    // add todo
    addTodoComponent.ngOnInit()

    let description = 'Test';
    let finishDate = '2022-06-24'
    let createdDate = new Date();

    addTodoComponent.frmTodo.value.descriptionTodo = description
    addTodoComponent.frmTodo.value.finishAt = finishDate
    addTodoComponent.createDate = createdDate

    addTodoComponent.onClickAdd();

    expect(todoService.updateTodo).toBeCalledWith({
      description: description,
      finish_at: finishDate,
      status: 0,
      id_author: 15,
      created_at: createdDate.toISOString(),
    })


  })

  /**
  *
  * Probar que el formulario muestre los mensajes de requerimiento cuando
  * el formulario no tenga la descripción y la fecha ingresada
 */
  it('Should validate the todo form, description and date required', async () => {
    addTodoComponent.ngOnInit()

    expect(addTodoComponent.frmTodo.value.descriptionTodo).toBeNull()
    expect(addTodoComponent.frmTodo.value.finishAt).toBeNull()
  })

  it('Should update a todo, description and date', async () => {
    //edit in todo
    todoWrapperComponent.editTodo(todoSelect)
    expect(stateService.setTodoSelect).toBeCalledWith(todoSelect)

    //edit in addtodo
    addTodoComponent.ngOnInit()
    addTodoComponent.todo = todoSelect;

    let description = 'Test';
    let finishDate = '2022-06-24'

    addTodoComponent.frmTodo.value.descriptionTodo = description
    addTodoComponent.frmTodo.value.finishAt = finishDate
    addTodoComponent.onClickAdd();

    expect(todoService.updateTodo).toBeCalledWith({
      ...todoSelect,
      description: description,
      finish_at: finishDate,
    })
  })

  it('Should delete a todo', async () => {
    todoWrapperComponent.deleteTodo(todoSelect)
    expect(todoService.deleteTodo).toBeCalledWith(todoSelect.id)

    expect(todoService.deleteTodo).toBeCalledWith(todoSelect.id)
  })

  /**
  *
  * Probar que el formulario muestre los mensajes de requerimiento cuando
  * el formulario no tenga la descripción y la fecha ingresada
 */
  it('Should update the todo status ', async () => {
    todoWrapperComponent.onChangeStatus(todoSelect)
    expect(todoService.updateTodo).toBeCalledWith({ ...todoSelect, status: 1 })
  })
  it('Should show an message when the todo list is empty  ', async () => {
    jest.spyOn(todoService, 'getTodoList').mockImplementation(() => of({
      success: true,
      type: 'task_rows',
      data: []
    }));
    todoWrapperComponent.getListTodo()
    todoWrapperComponent.ngOnInit()
    // expect(todoWrapperComponent.listPayments).toEqual([])
  })

  /**
  *
  * Probar que la barra de estado cambia cuando se completa una tarea
  * se puede probar por el cambio en texto o por porcentaje de completitud
 */
  it('Should the progress bar change its label text or percentage when a todo is completed ', async () => {

    // 0 completas
    const selectedTodo = {
      id: 28,
      description: 'Nuevo Todo',
      status: 0,
      id_author: 1,
      finish_at: '2022-06-16T00:00:00.000Z',
      created_at: '2022-06-14T13:14:08.000Z',
    };
    const todoList = [
      {
        id: 26,
        description: 'Nueva tarea',
        status: 0,
        id_author: 1,
        finish_at: '2022-06-24T00:00:00.000Z',
        created_at: '2022-06-14T12:06:38.000Z',
      },
      selectedTodo
    ];

    todoWrapperComponent.listPayments = todoList;

    // completos 0
    expect(todoWrapperComponent.getCompleteTodo()).toEqual(0)

    // completos 1
    todoWrapperComponent.onChangeStatus(selectedTodo)
    expect(todoWrapperComponent.getCompleteTodo()).toEqual(1)
  })

  /**
   *
   * Probar el filtro de las tareas por descripcion
  */
  it('Should filter the todo list by description', async () => {

    const listTodo = [
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
    ]

    todoWrapperComponent.listPayments = listTodo;
    todoWrapperComponent.onKeyUp('todo');
    expect(todoWrapperComponent.searchList.length).toEqual(1);
  })

  /**
   *
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente
   * sobre el boton del filtro se muestren todos la lista nuevamente
  */
  it('Should filter the todo list by completed status and toggle functionality button', async () => {
    const listTodo = [
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
    ];

    todoWrapperComponent.listPayments = listTodo;
    todoWrapperComponent.searchList = listTodo;

    // show all in false
    todoWrapperComponent.onClickShowAll()
    expect(todoWrapperComponent.searchList.length).toEqual(1)

    // show all in true
    todoWrapperComponent.onClickShowAll()
    expect(todoWrapperComponent.searchList.length).toEqual(2)
  })

  it('Should to be back in add todo ', async () => {
    jest.spyOn(addTodoComponent, 'onGoToMainPage')
    addTodoComponent.onClickBack();
    expect(addTodoComponent.onGoToMainPage).toBeCalled()

    addTodoComponent.onGoToMainPage();
    expect(stateService.setTodoSelect).toBeCalledWith(undefined);
  })

});