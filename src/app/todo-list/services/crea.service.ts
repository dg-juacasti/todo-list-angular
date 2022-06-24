import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import { tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { Lista } from 'src/app/lista';

@Injectable({
  providedIn: 'root'
})

export class RegistrarListaComponent implements OnInit {

    lista : Lista = new Lista();
    constructor(private ListaServicio:ListaService, private router:Router,public listaLista: creaListaComponent) { 
      this.lista.category="main";
      this.lista.createdAt=new Date(Date.now()).toISOString();
      this.lista.updatedAt=new Date(Date.now()).toISOString();
      this.lista.state='default';
    }
  
    ngOnInit(): void {
      
    }

export class creaService {

  private readonly ID_AUTOR = 1;
  private readonly ENPOINT = 'https://bp-todolist.herokuapp.com/?id_author=1';

  constructor(
    private http: HttpClient,
    private readonly state: StateService
  ) { }

  creatarea(): Observable<Object> | undefined {
    return this.http.post<Object>(`${this.ENPOINT}/?????`).pipe(
      tap(
        resp => {
          this.state.setTodoList(resp.data);
        }
      )
    );
  }

}
