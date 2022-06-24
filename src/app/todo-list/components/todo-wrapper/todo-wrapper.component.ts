import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { StateService } from '../../services/state.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

  listPayments: Todo[] = [];
  searchTerm$ = new BehaviorSubject<string>('');
  listFiltered$: Observable<Todo []>;

  constructor(
    private readonly todoService: TodoService,
    private readonly state: StateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getListTodo();
    this.state.todoList$.subscribe(resp => this.listPayments = resp);
  }

  getListTodo() {
    this.todoService.getTodoList().subscribe();
  }

  onChangeStatus(todo: Todo) {
  }

  addTodo() {
    this.router.navigate(['/todo']);
  }

  filterList(): void {
    this.listFiltered$ = this.searchTerm$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(term => {
            return this.listPayments
              .filter(item => item.description.toLowerCase().indexOf(term.toLowerCase()) >= 0);
        })
      );
  }

  borrarTarea(todo:Todo){
    console.log('borrar '+todo.id);
    this.todoService.eliminarTarea(todo).subscribe(i=>{
      this.router.navigate(['/']);
     });


  }
  actualizarTarea(todo:Todo){
    console.log('actualizar '+todo.id);
    this.todoService.actualizarTarea(todo).subscribe(i=>{
      this.router.navigate(['/']);
     });

  }




}
