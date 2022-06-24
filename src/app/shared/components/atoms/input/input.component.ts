import { Component, Input, OnInit } from "@angular/core";
import { FormControl, NgControl } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  @Input() placeholder = "";

  constructor(private readonly _control: NgControl) {}

  ngOnInit(): void {}

  get formControl(): FormControl {
    return this._control.control as FormControl;
  }
}
