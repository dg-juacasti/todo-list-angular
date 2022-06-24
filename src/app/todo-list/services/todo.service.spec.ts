import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ResponseTodo } from '../interfaces/response';
//import { ConstantesApp } from '../../Utilities/constantes';
import { Todo } from '../interfaces/todo';

import { TodoService } from './todo.service';

const todo:Todo={
  
    id: 1,
    id_author: 1,
    status: 1,
    description: "Prueba",
    finish_at: "2022-06-03T21:47:23.000Z",
    created_at: "2022-06-03T21:47:23.000Z"


}
const urlApi:string="https://bp-todolist.herokuapp.com";
const idAuthor:string='13'

const todos: Todo[]=[todo];
//const reponseTodo :ResponseTodo;// new ResponseTodo("true" ,"prueba",todo);




describe('TodoService', () => {
  let service: TodoService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[TodoService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    });
    /* service = TestBed.inject(SheroesService); */
  });

  beforeEach(()=>{
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    httpMock=TestBed.inject(HttpTestingController);
  })

  afterEach(()=>{
    httpMock.verify();
  })

  it('Varifica creación servicio TodoService', () => {
    expect(service).toBeTruthy();
  });

  it('prueba metodo obtener lista',()=>{
    service.getTodoList().subscribe((resp:ResponseTodo)=>{
      expect(resp).toEqual(todo);
    });
    //inicializa el mock
    const resq=httpMock.expectOne(`${urlApi}?idAuthor=${idAuthor}`);
    expect(resq.request.method).toBe('GET');
    resq.flush(todos);
  })



  it('prueba metodo AgregarTodos',()=>{
    
    service.addTodoList(todo).subscribe((resp)=>{
      expect(resp).toEqual("Agregado");
    });
    //inicializa el mock
    const resq=httpMock.expectOne(`${urlApi}?idAuthor=${idAuthor}`);
    expect(resq.request.method).toBe('POST');
    resq.flush(todos);
  })
  it('prueba metodo editar',()=>{
    let id=5
    service.Update(todo,id).subscribe((resp)=>{
      expect(resp).toEqual("Personaje actualizado");
    });
    //inicializa el mock
    const resq=httpMock.expectOne(`${urlApi}/${id}?idAuthor=${idAuthor}`);
    expect(resq.request.method).toBe('PUT');
    resq.flush(todo);
  })

  it('prueba metodo eliminar',()=>{
    let id="2"
    service.deleteTodoList(id).subscribe((resp)=>{
      expect(resp).toEqual("eliminar");
    });
    //inicializa el mock
    const resq=httpMock.expectOne(`${urlApi}/${id}?idAuthor=${idAuthor}`);
    expect(resq.request.method).toBe('DELETE');
    resq.flush(todos);
  })

});
