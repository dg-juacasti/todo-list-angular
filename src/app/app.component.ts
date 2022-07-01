import { Component, OnInit  } from '@angular/core';
import {AddTodoComponent} from './todo-list/components/add-todo/add-todo.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

 constructor(private tareasService) { }

  nombreTarea = ""
  public tareas: AddTodoComponent[] = []
  guardarTarea() {
    const nuevaTarea = new AddTodoComponent(this.nombreTarea);
    this.tareas.push(nuevaTarea);
    this.tareasService.guardarTareas(this.tareas);
    this.obtenerTareas();
    // Y limpiamos el input
    this.nombreTarea = "";
  }
  /*
  Nota: aquí utilizo el índice porque solo trabajo con un array. Si tú usas
  una base de datos probablemente quieras usar el ID del elemento en lugar del índice
   */
  eliminarTarea(indice: number) {
    // Primero le preguntamos al usuario
    const confirma = confirm("¿Realmente quiere eliminar la tarea?");
    if (!confirma) {
      return;
    }
    // Eliminamos del arreglo y guardamos
    this.tareas.splice(indice, 1);
    this.tareasService.guardarTareas(this.tareas);
  }
  cambiarEstadoDeTarea() {
    // No debemos hacer nada con la tarea, ya que el input con el ngModel ha
    // cambiado la variable, así que solo guardamos las tareas tal y como están
    // Es decir, this.tareas ya está modificada hasta este punto
    this.tareasService.guardarTareas(this.tareas);
  }
  obtenerTareas() {
    this.tareas = this.tareasService.obtenerTareas();
  }
  ngOnInit() {
    this.obtenerTareas();
  }
}