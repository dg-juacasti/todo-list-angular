import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Tarea } from '../../entidades/Todo';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public frmTodo: FormGroup;
  listPayments: Todo[] = [];
  constructor(
    private readonly fb: FormBuilder, private readonly todoService: TodoService,
    private router: ActivatedRoute,private readonly state: StateService ) {
     
  }

  ngOnInit(): void {
    this.frmTodo = this.fb.group({
      descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
      finishAt: [null, [Validators.required]]
    });
    this.state.todoList$.subscribe(resp => this.listPayments = resp);
    console.log("valor de id",this.router.snapshot.queryParamMap.get('id'));
    const result = this.listPayments.filter((obj) => {
      return obj.id.toString() === this.router.snapshot.queryParamMap.get('id');
    });
    if(result.length >0){
      this.frmTodo.get('descriptionTodo').setValue(result[0].description);
      this.frmTodo.get('finishAt').setValue(result[0].finish_at);
    }
    
  }


  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onClickAdd() {
    console.log("agregar tareas...")
    let tarea = new Tarea();
    tarea.description = this.descriptionTodo;
    tarea.status = 0;
    tarea.id_author = 7;
    tarea.finish_at = this.finishAt;
    this.todoService.setTodoList(tarea).subscribe((mensaje:any) => 
    {console.log(mensaje.success)
      this.frmTodo.reset();
    });

// if(tarea.id === null){
 
 //}else{
   //modificar
 //}
   
  }

  onClickVovler(){

  }

  get fechaInvalida() {
    return this.frmTodo.get('finishAt').invalid && this.frmTodo.get('finishAt').touched
  }

  get descripcionInvalida() {
    return this.frmTodo.get('descriptionTodo').invalid && this.frmTodo.get('descriptionTodo').touched
  }
  

  get descriptionTodo() {
    return this.frmTodo.get('descriptionTodo').value;
  }

  get finishAt() {
    return this.frmTodo.get('finishAt').value;
  }

}
