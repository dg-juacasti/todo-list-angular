import { Todo } from "./todo";

export interface ResponseTodo {
    success: boolean;
    type: string;
    data: Todo[]
}

export interface ResponseAddTodo {
    data: Todo;
    success: boolean;
    type: string;
}