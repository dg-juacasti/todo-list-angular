import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-add-todo",
	templateUrl: "./add-todo.component.html",
	styleUrls: ["./add-todo.component.scss"],
})
export class AddTodoComponent implements OnInit {
	id: number;
	list: Todo;
	showInterface = false;
	public frmTodo: FormGroup;

	constructor(
		private readonly fb: FormBuilder,
		private _todoService: TodoService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	get getFrmTodo() {
		return this.frmTodo.controls;
	}

	ngOnInit(): void {
		this.getParam();
		if (this.id) {
			this.list = this._todoService.getListById(this.id);
			if (!this.list) {
				this.navigateTo("");
			}
		}

		this.createForm();
		this.showInterface = true;
	}

	getParam() {
		this.id = Number(this.route.snapshot.params.id);
	}

	createForm() {
		const description = this.list?.description
			? this.list.description
			: null;
		const finish = this.list?.finish_at ? this.list.finish_at : null;
		this.frmTodo = this.fb.group({
			descriptionTodo: [
				description,
				[Validators.maxLength(50), Validators.required],
			],
			finishAt: [finish, [Validators.required]],
		});
	}

	handleText(control: string) {
		return this.frmTodo.get(control)?.value;
	}

	completeDate() {
		if (this.id) {
			this.list.description = this.handleText("descriptionTodo");
			this.list.finish_at = this.handleText("finishAt");
		} else {
			this.list = {
				id_author: 2,
				description: this.handleText("descriptionTodo"),
				status: 0,
				created_at: new Date().toString(),
				finish_at: this.handleText("finishAt"),
			};
		}
	}

	onClickAdd() {
		this.completeDate();
		if (this.id) {
			this.updateList();
		} else {
			this.addList();
		}
	}

	addList() {
		this._todoService.addList(this.list).subscribe(
			(res) => {
				this.navigateTo("");
			},
			(err) => {
				console.log(`error`);
			}
		);
	}

	updateList() {
		this._todoService.updateList(this.list).subscribe(
			(res) => {
				this.navigateTo("");
			},
			(err) => {
				console.log(`error al actualizar`);
			}
		);
	}

	navigateTo(route: string) {
		this.router.navigate([`/${route}`]);
	}
}
