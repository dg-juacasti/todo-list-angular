import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})

export class AddTodoComponent {
    public descripcion: string
    public terminada: boolean
  constructor(descripcion: string, terminada?: boolean) {
      this.terminada = terminada ? terminada : false;
      this.descripcion = descripcion;
  }

}
