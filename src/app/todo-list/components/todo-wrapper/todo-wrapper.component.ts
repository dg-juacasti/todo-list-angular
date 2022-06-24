import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo";
import { StateService } from "../../services/state.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "app-todo-wrapper",
	templateUrl: "./todo-wrapper.component.html",
	styleUrls: ["./todo-wrapper.component.scss"],
})
export class TodoWrapperComponent implements OnInit {
	listPayments: Todo[] = [];
	copyList: Todo[] = [];
	formSearch: FormGroup;
	taskComplete = 0;
	constructor(
		private readonly todoService: TodoService,
		private readonly state: StateService,
		private router: Router,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.getListTodo();
		this.createSearchForm();
		this.state.todoList$.subscribe(
			(resp) => (this.listPayments = this.copyList = resp)
		);
	}

	get getFormSearch() {
		return this.formSearch.controls;
	}
	getListTodo() {
		this.todoService.getTodoList().subscribe();
	}

	createSearchForm() {
		this.formSearch = this.fb.group({
			term: [null, [Validators.required, Validators.minLength(3)]],
		});
	}

	onChangeStatus(todo: Todo) {
		todo.status = todo.status === 1 ? 0 : 1;
		this.todoService.updateList(todo).subscribe(
			(res) => {},
			(err) => {
				console.log(`error al actualizar estado`);
			}
		);
	}

	addTodo(id = null) {
		if (id) {
			this.router.navigate(["/todo", id]);
		} else {
			this.router.navigate(["/todo"]);
		}
	}

	removeList(id: number) {
		this.todoService.removeList(Number(id)).subscribe(
			(res) => {},
			(err) => {
				console.log("error al eliminar");
			}
		);
	}

	searchList() {
		const value = this.formSearch.get("term").value;
		if (this.formSearch.valid) {
			this.listPayments = this.listPayments.filter((m) =>
				m.description.includes(value)
			);
		}
	}

	completeTask() {
		const data = this.listPayments.filter((m) => m.status === 1);
		this.taskComplete = data?.length;
		return this.taskComplete;
	}

	filterNoCompleteTask() {
		const newList = this.listPayments.filter((m) => m.status === 0);
		this.listPayments = [...newList];
	}

	widthBackground() {
		const width = (this.taskComplete / this.listPayments.length) * 100;
		return width + "%";
	}
}
