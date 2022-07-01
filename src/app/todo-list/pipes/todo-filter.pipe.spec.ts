import { Todo } from "../interfaces";
import { TodoFilterPipe } from "./todo-filter.pipe";

describe("TodoFilterPipe", () => {
  let pipe: TodoFilterPipe;

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

  beforeEach(() => {
    pipe = new TodoFilterPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should return all todos by filter text if showAll is true", () => {
    const result = pipe.transform(mockTodos, "Nueva tarea");
    expect(result).toHaveLength(1);
  });

  it("should return all todos by filter text and status if showAll is false", () => {
    const result = pipe.transform(mockTodos, "Nuevo Todo", false);
    expect(result).toHaveLength(1);
  });
});
