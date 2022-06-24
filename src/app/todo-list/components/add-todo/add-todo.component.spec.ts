import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from '../../interfaces/todo';
import { TodoWrapperComponent } from '../todo-wrapper/todo-wrapper.component';

const tareas: Todo[] =
  [
    { 
        "id": 74,
        "description": "Completar todolist",
        "status": 0,
        "id_author": 32,
        "finish_at": "2022-06-24T21:47:23.000Z",
        "created_at": "2022-06-24T15:02:04.000Z"
    }
  ];


const ServiceMock = {
  getTareas: () => of(tareas),
  updateTarea: () => of(tareas),
  deleteTarea: () => of()
};

describe('TodoWrapperComponent', () => {
  let component: TodoWrapperComponent;
  let fixture: ComponentFixture<TodoWrapperComponent>;
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ TodoWrapperComponent ],
      providers: [
        {provide:TodoService, useValue:ServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //service = TestBed.inject(ServiceMock);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

});
