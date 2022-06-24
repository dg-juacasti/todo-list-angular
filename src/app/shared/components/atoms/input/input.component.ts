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

  searchText: string = '';
  @Output() emitSearchText: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(event) {
    this.onKeyUpEvent.emit(event);
  }

  searchCharacter(searchTxt: string) {
    this.emitSearchText.emit(searchTxt);
  }

}
