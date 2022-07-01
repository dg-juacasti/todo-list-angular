import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ResponseTodo, Todo } from "../interfaces";
import { StateService } from "./state.service";
import { TodoService } from "./todo.service";

const mockTodos: Todo[] = [
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
];

describe("StateService tests", () => {
  let service: StateService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(StateService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get todoList return current list state", () => {
    service.setTodoList(mockTodos);
    expect(service.todoList).toEqual(mockTodos);
  });

  it("should todoSelected return current selected todo", () => {
    service.setTodoSelected(mockTodos[0]);
    expect(service.todoSelected).toEqual(mockTodos[0]);
  });
});
