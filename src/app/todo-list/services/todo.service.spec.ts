import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpTesting: HttpTestingController;
  let httpSpy: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpTesting = TestBed.inject(HttpTestingController);
    httpSpy = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //   it('debe hacer una peticion con el metodo [GET] cuando se llama al metodo #getAll', (done) => {
  //     const fecha = new Date();
  //     const dataMock: ReadCategoryModel[] = [
  //       { Categoria: 'embutidos', CategoryID: 1, Fecha: fecha.toString() },
  //       { Categoria: 'bebidas', CategoryID: 2, Fecha: fecha.toString() },
  //     ];

  //     const apiUrl = environment.url_back;
  //     service.getAll().subscribe((data) => {
  //       expect(data).toEqual(dataMock);
  //       done();
  //     });
  //     // jest.runAllTimers();
  //     const req = httpTesting.expectOne(`${apiUrl}/category`);
  //     expect(req.request.method).toEqual('GET');
  //     req.flush(dataMock);

  //     httpTesting.verify();
  //   });

  //   it('debe hacer una peticion responda una categoria ', (done) => {
  //     const fecha = new Date();
  //     const dataMock = [
  //       { Categoria: 'embutidos', CategoryID: 1, Fecha: fecha.toString() },
  //       { Categoria: 'bebidas', CategoryID: 2, Fecha: fecha.toString() },
  //     ];

  //     jest.spyOn(httpSpy, 'get').mockReturnValue(of(dataMock));
  //     service.getAll().subscribe((data) => {
  //       expect(data).toBe(dataMock);
  //       done();
  //     });
  //   });
});
