import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from './todo.service';
import { ResponseTodo } from '../interfaces/response';

const interf:ResponseTodo={

    success: true,
    type:'',
    data:[]
    
  
}

const ID_AUTOR = 23;
const ENPOINT = 'https://bp-todolist.herokuapp.com';

const interfaTask: ResponseTodo[]=[interf]
describe('TodoService', () => {
  let service: TodoService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[TodoService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    
    });
    /* service = TestBed.inject(TodoService); */
  });
  beforeEach(()=>{
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    httpMock=TestBed.inject(HttpTestingController);
  })

  afterEach(()=>{
    httpMock.verify();
  })

  it('Varifica creación servicio ', () => {
    expect(service).toBeTruthy();
  });
  it('prueba metodo obtenerListaHeroes',()=>{
    service.getTodoList().subscribe((resp:ResponseTodo[])=>{
      expect(resp).toEqual(interf);
    });
    //inicializa el mock
    const resq=httpMock.expectOne(`${ENPOINT}/?id_author=${ID_AUTOR}`);
    expect(resq.request.method).toBe('GET');
    resq.flush(interf);
  })
});
