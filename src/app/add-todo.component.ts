import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lista } from './lista';
import { StateService } from './todo-list/services/state.service';
import { RegistrarListaComponent } from './todo-list/services/crea.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  /*
  public frmTodo: FormGroup;

  constructor(
    private readonly fb: FormBuilder) {
  }

    descripcion!: string;
    status: string;
    id_autor: string;
    finich_at!: string;
  */

  lista : Lista = new this.listaTarea();

  constructor(private listaServicio:creaService, private router:Router,public listaTarea: export class AddTodoComponent implements OnInit {
    ) { 
    this.lista.descripcion='default';
    this.lista.status='default';
    this.lista.id_autor='default';
    this.lista.finich_at=new Date(Date.now()).toISOString();
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
   

  onClickAdd() {

    guardarlista(){
      this.ListaServicio.RegistrarListaComponent(this.Lista).subscribe(dato=> {
        this.Lista.obtenerLista();
      },error => console.log(error));
      
      this.crealista.mostrarRegistro(false);
      
  }
});  
}

}
