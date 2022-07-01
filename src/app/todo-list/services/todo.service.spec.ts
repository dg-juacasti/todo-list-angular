import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ResponseTodo, Todo } from "../interfaces";
import { TodoService } from "./todo.service";

const todoListResponse: ResponseTodo = {
  success: true,
  type: "task_rows",
  data: [
    {
      id: 26,
      description: "Nueva tarea",
      status: 1,
      id_author: 1,
      finish_at: "2022-06-24T00:00:00.000Z",
      created_at: "2022-06-14T12:06:38.000Z",
    },
    {
      id: 28,
      description: "Nuevo Todo",
      status: 0,
      id_author: 1,
      finish_at: "2022-06-16T00:00:00.000Z",
      created_at: "2022-06-14T13:14:08.000Z",
    },
  ],
};

describe("TodoService tests", () => {
  let service: TodoService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get Todos list", () => {
    service.getTodoList().subscribe((response) => {
      expect(response).toEqual(todoListResponse);
    });
    const request = httpClient.expectOne(
      `${(service as any).ENDPOINT}/?id_author=${(service as any).ID_AUTOR}`
    );
    expect(request.request.method).toBe("GET");
    request.flush(todoListResponse);
  });

  it("should createTodo create a Todo", () => {
    const mockRespose = {
      success: true,
    };

    const dummieTodo: Todo = {
      description: "desc1",
      finish_at: "2022-06-16T00:00:00.000Z",
      id_author: 4,
      status: 0,
    };

    service.createTodo(dummieTodo).subscribe((response) => {
      expect(response).toEqual(mockRespose);
    });
    const request = httpClient.expectOne(
      `${(service as any).ENDPOINT}/?id_author=${(service as any).ID_AUTOR}`
    );
    expect(request.request.method).toBe("POST");
    request.flush(mockRespose);
  });

  it("should updateTodo update a Todo", () => {
    const mockRespose = {
      success: true,
    };

    const dummieTodo: Todo = {
      description: "desc to update",
      finish_at: "2022-06-16T00:00:00.000Z",
      id_author: 4,
      status: 0,
      id: 1,
    };

    service.updateTodo(dummieTodo.id, dummieTodo).subscribe((response) => {
      expect(response).toEqual(mockRespose);
    });
    const request = httpClient.expectOne(
      `${(service as any).ENDPOINT}/${dummieTodo.id}`
    );
    expect(request.request.method).toBe("PUT");
    request.flush(mockRespose);
  });

  it("should deleteTodo delete a todo", () => {
    const mockRespose = {
      success: true,
    };

    const deleteId: number = 1;

    service.deleteTodo(deleteId).subscribe((response) => {
      expect(response).toEqual(mockRespose);
    });
    const request = httpClient.expectOne(
      `${(service as any).ENDPOINT}/${deleteId}`
    );
    expect(request.request.method).toBe("DELETE");
    request.flush(mockRespose);
  });
});
