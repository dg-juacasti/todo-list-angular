import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http';
import { TodoInterface } from './todo-interface';
import { GetallInterface } from './Getall-interface';
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  listTodo:TodoInterface[];
  Base_url="https://bp-todolist.herokuapp.com/?id_author=1";

  constructor(private http:HttpClient) { }

  GetAll(){
    console.log(this.http.get<TodoInterface[]>(this.Base_url))
    return this.http.get<GetallInterface>(this.Base_url);
  }

  Create(singleTodo:TodoInterface){
    console.log(singleTodo);
    return this.http.post(this.Base_url, singleTodo);
  }

  Edit(){
    
  }

  Delete(){
    
  }

  Search(){
    
  }
}
