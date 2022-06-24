import { Todo } from "./todo";

export interface ResponseTodo {
    success: boolean;
    type: string;
    data: Todo[]
}