import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, NgControl } from "@angular/forms";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
	@Input() id: string;
	@Input() placeholder = "Escriba aquí por favor...";
	@Input() type = "text";
	@Input() value;
	@Input() min: number | string;
	@Input() max: number | string;
	format = "DD MMMM YYYY";

	@Output() onKeyUpEvent = new EventEmitter<any>();

	constructor(private control: NgControl) {}

	ngOnInit(): void {}

	onKeyUp(event) {
		this.onKeyUpEvent.emit(event);
	}

	get formControl() {
		return this.control.control! as FormControl;
	}

	get hasErrors() {
		return this.formControl.touched && this.formControl.invalid;
	}

	get inputValue() {
		return this.formControl.value;
	}

	get minLength() {
		const value = this.inputValue;
		return this.min && value.length < this.min ? true : false;
	}
}
