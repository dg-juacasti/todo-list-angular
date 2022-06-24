import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {TodoWrapperComponent} from './todo-wrapper.component';
import {AddTodoComponent} from '../add-todo/add-todo.component';
import {StateService} from '../../services/state.service';
import {TodoService} from '../../services/todo.service';
import {ResponseTodo} from '../../interfaces/response';
import {Todo} from "../../interfaces/todo";

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
                StateService
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
        jest.spyOn(todoService, 'updateTodo').mockImplementation(() => of(todoListResponse));
    });

    afterEach(() => {
        fixture.destroy();
        jest.resetAllMocks();
    });

    it('should create TodoWrapperComponent', () => {
        expect(todoWrapperComponent).toBeTruthy();
    });

    /**
     *
     * Probar que el formulario muestre los mensajes de requerimiento cuando
     * el formulario no tenga la descripción y la fecha ingresada
     */
    it('Should update the todo status ', async () => {
        todoWrapperComponent.onChangeStatus({
            id: 26,
            description: 'Nueva tarea',
            status: 1,
            id_author: 1,
            finish_at: '2022-06-24T00:00:00.000Z',
            created_at: '2022-06-14T12:06:38.000Z',
        });
        expect(todoService.updateTodo).toHaveBeenCalled();
    });

    /**
     *
     * Probar el filtro de las tareas por descripcion
     */
    it('Should filter the todo list by description', async () => {
        todoWrapperComponent.searchTodo('tarea1');
        expect(todoWrapperComponent.listPayments).toEqual(undefined);
    });
});