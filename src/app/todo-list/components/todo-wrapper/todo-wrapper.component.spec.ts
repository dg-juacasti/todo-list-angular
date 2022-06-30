import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoWrapperComponent } from './todo-wrapper.component';

describe('TodoWrapperComponent', () => {
    let component: TodoWrapperComponent;
    let fixture: ComponentFixture<TodoWrapperComponent>;
    let todoService: TodoService;
    const mockTodo1: Todo = {
        description: '2222',
        finish_at: 'hkhdsdsd',
        id_author: 3,
        status: 0
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TodoWrapperComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        todoService = TestBed.inject(TodoService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('llamar al servicio getPokemons', () => {
        const spyGetTodos = jest.spyOn(todoService, 'getAll');

        component.getAll();
        expect(spyGetTodos).toHaveBeenCalled();
    })
});
