import { TodoService } from "../../services/todo.service";
import { TodoWrapperComponent } from "./todo-wrapper.component";

describe('TodoWrapperComponent', () => {
    let component: TodoWrapperComponent;
    let todoServiceMock: any;
    let routerMock: any;

    beforeEach(() => {
        todoServiceMock = {
            getTodoList: jest.fn(),
            newTodo: jest.fn(),
            updateTodo: jest.fn(),
            deleteTodo: jest.fn(),
        }

        routerMock = { navigate: jest.fn() };
        component = new TodoWrapperComponent(todoServiceMock, routerMock);
    })

    it('is created succesfully', () => {
        expect(component).toBeTruthy();
    })


    it('addTodo', () => {
        let navigateSpy = jest.spyOn(routerMock, 'navigate');

        component.addTodo();

        expect(navigateSpy).toHaveBeenCalled();
    });

    // it('llamar al servicio getPokemons', () => {
    //     let spyGetTodos = jest.spyOn(todoServiceMock, 'getTodoList');

    //     component.getAll();

    //     expect(spyGetTodos).toHaveBeenCalled();
    // })
});
