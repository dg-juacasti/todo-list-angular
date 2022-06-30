import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/todo-list/interfaces/todo';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(todos: Todo[], searchTxt: string = ''): Todo[] {
    // Paginator (6)
    // Search Todo (Description)
    searchTxt = searchTxt.toLowerCase();
    const filterTodos = todos.filter(todo => todo.description.toLowerCase().includes(searchTxt));
    return filterTodos;

  }

}
