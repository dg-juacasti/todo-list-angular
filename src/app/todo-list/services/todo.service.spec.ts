import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../interfaces/todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpTesting: HttpTestingController;
  const ENPOINT = 'https://bp-todolist.herokuapp.com';
  const ID_AUTOR = 3;
  const mockTodo1: Todo = {
    description: 'ddd',
    finish_at: 'hkh',
    id_author: 3,
    status: 0
  }

  const mockTodo2: Todo = {
    description: '2222',
    finish_at: 'hkhdsdsd',
    id_author: 3,
    status: 0
  }

  const mockTodo3: Todo = {
    description: '2222',
    finish_at: 'hkhdsdsd',
    id_author: 3,
    status: 0,
    id: 5
  }


  const mockTodo4: Todo = {
    description: '2222',
    finish_at: 'hkhdsdsd',
    id_author: 3,
    status: 0
  }

  const mockArray: Todo[] = [mockTodo1, mockTodo2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(TodoService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a valid baseUrl when service is created', () => {
    expect(service.ENPOINT).toContain(ENPOINT);
  });

  it('getAll Todos', () => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual(mockArray);
    });

    const apiurl = `${ENPOINT}/?id_author=${ID_AUTOR}`;
    const req = httpTesting.expectOne({
      method: 'GET',
      url: apiurl,
    });

    req.flush(mockArray);
  });


  it('new todo', () => {

    const apiurl = `${ENPOINT}/?id_author=${ID_AUTOR}`;

    service.newTodo(mockTodo4).subscribe((data) => {
      expect(data).toEqual(mockTodo4);
    });

    const req = httpTesting.expectOne({
      method: 'POST',
      url: apiurl,
    });

    req.flush(mockTodo4);
  });


  it('edit todo', () => {

    const update1: Todo = {
      description: '2222',
      finish_at: 'hkhdsdsd',
      id_author: 3,
      status: 0,
      id: 6
    }

    service.updateTodo(update1).subscribe((data) => {
      expect(data).toEqual(update1);
    });

    const req = httpTesting.expectOne({
      method: 'PUT',
      url: `${ENPOINT}/${update1.id}`,
    });

    req.flush(update1);
  });

  it('delete todo', () => {
    service.deleteTodo(mockTodo3.id).subscribe((data) => {
      expect(data).toEqual(mockTodo3);
    });

    const req = httpTesting.expectOne({
      method: 'DELETE',
      url: `${ENPOINT}/${mockTodo3.id}`,
    });

    req.flush(mockTodo3);
  });

});
