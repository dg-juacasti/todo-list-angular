import { AddTodoComponent } from "./add-todo.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ResponseTodo } from "../../interfaces/response";
import { of } from "rxjs";
import { Todo } from "../../interfaces/todo";
import { Router } from "@angular/router";

const list: Todo = {
	id: 26,
	description: "Test",
	status: 1,
	id_author: 2,
	finish_at: "2022-06-24T00:00:00.000Z",
	created_at: "2022-06-24T12:06:38.000Z",
};
const list2: Todo = {
	id: 26,
	description: "Test actualizado",
	status: 1,
	id_author: 2,
	finish_at: "2022-06-24T00:00:00.000Z",
	created_at: "2022-06-24T12:06:38.000Z",
};

const todoListResponse: ResponseTodo = {
	success: true,
	type: "task_rows",
	data: [list],
};

const todoListResponseUpdate: ResponseTodo = {
	success: true,
	type: "task_rows",
	data: [list2],
};

class ComponentTestRoute {}

const TodoServiceMock = {
	addList: () => of(todoListResponse),
	getListById: () => list,
	updateList: () => of(todoListResponseUpdate),
};

describe("AddTodoComponent", () => {
	let component: AddTodoComponent;
	let fixture: ComponentFixture<AddTodoComponent>;
	let service: TodoService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				RouterTestingModule.withRoutes([
					{ path: "", component: ComponentTestRoute },
					{ path: "todo", component: ComponentTestRoute },
				]),
				FormsModule,
				ReactiveFormsModule,
			],
			declarations: [AddTodoComponent],
			providers: [{ provide: TodoService, useValue: TodoServiceMock }],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddTodoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = fixture.debugElement.injector.get(TodoService);
	});

	afterEach(() => {
		fixture.destroy();
		jest.resetAllMocks();
	});

	it("should create TodoWrapperComponent", () => {
		expect(component).toBeTruthy();
	});

	it("Should create a new todo", async () => {
		const router = TestBed.inject(Router);
		const spy = jest.spyOn(router, "navigate");
		const description = component.frmTodo.get("descriptionTodo");
		description.setValue("Test");
		const finish = component.frmTodo.get("finishAt");
		finish.setValue("2022-06-24");
		component.onClickAdd();
		expect(component.list.description).toBe("Test");
		expect(component.list.finish_at).toBe("2022-06-24");
		expect(spy).toHaveBeenCalledWith(["/"]);
	});

	it("Should validate the todo form, description and date required", async () => {
		const description = component.frmTodo.get("descriptionTodo");
		description.setValue("Test");
		const finish = component.frmTodo.get("finishAt");
		finish.setValue("2022-06-24");
		expect(component.frmTodo.valid).toBe(true);
	});

	it("Should update a todo, description and date", async () => {
		component.id = 26;
		component.list = list;
		const router = TestBed.inject(Router);
		const spy = jest.spyOn(router, "navigate");
		expect(component.list).toBeTruthy();
		const description = component.frmTodo.get("descriptionTodo");
		description.setValue("Test actualizado");
		component.onClickAdd();
		expect(component.list.description).toEqual("Test actualizado");
	});
});
