import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TodoService } from "./todo.service";
import { ResponseTodo } from "../interfaces/response";

const ID_AUTOR = 35;
const ENPOINT = 'https://bp-todolist.herokuapp.com';

const response : ResponseTodo = {
  success: true;
    type: "nota";
}

describe('TodoService', () => {
    let service: TodoService;
    let httpMock : HttpTestingController
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports : [HttpClientTestingModule],
        providers : [TodoService],
        schemas : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]});
             
    });
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(TodoService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    })
  
    it ('verifica creacion componente StateService', () => {
      expect(service).toBeTruthy();
    });
  
    it('prueba metodo GetTodoList', () => {
      service.getTodoList().subscribe((resp : ResponseTodo ) => {
        expect(resp).toEqual(ResponseTodo);
      });
  
      const resq = httpMock.expectOne(`${ENPOINT}?idAuthor=${ID_AUTOR}`);
      expect(resq.request.method).toBe('GET');
      resq.flush(ResponseTodo);
    })
  
    it('verifica creacion componente ServiceHeroeService', () => {
      expect(service).toBeTruthy();
    });
  });
  