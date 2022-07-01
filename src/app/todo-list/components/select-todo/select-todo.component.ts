import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-todo',
  templateUrl: './select-todo.component.html',
  styleUrls: ['./select-todo.component.css']
})
export class SelectTodoComponent implements OnInit {

  @Input() readonly placeholder: string = '';
  @Output() setValue: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
