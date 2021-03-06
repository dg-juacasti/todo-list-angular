import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddTodoComponent } from './add-todo.component';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

describe('AddTodoComponent', () => {
    let component: AddTodoComponent;
    let fixture: ComponentFixture<AddTodoComponent>;
    let todoService: TodoService;
    const mockTodo1: Todo = {
        description: '2222',
        finish_at: 'hkhdsdsd',
        id_author: 3,
        status: 0
    }

    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddTodoComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddTodoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        todoService = TestBed.inject(TodoService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('llamar al servicio getPokemons', () => {
        const spyGetTodos = jest.spyOn(todoService, 'newTodo');

        component.NewTodo(mockTodo1);
        expect(spyGetTodos).toHaveBeenCalled();
    })

    it('onClickAdd', () => {
        let description='description1';
        let date='22-01-2022'
        component.frmTodo = formBuilder.group({
            description: new FormControl(description),
            finish_at: new FormControl(date)
        });

        component.onClickAdd();

        expect(component.todo.description).toEqual(description);
        expect(component.todo.finish_at).toEqual(date);
    })
});
