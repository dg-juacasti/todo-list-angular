import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder = '';
  @Input() frmTodo: FormGroup;
  @Output() onKeyUpEvent = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(event) {

    let descripcionTodo = this.frmTodo.get("descriptionTodo").value;
    console.log("Descripcion de Todo:" +descripcionTodo);
    this.onKeyUpEvent.emit(descripcionTodo);
  }

}
