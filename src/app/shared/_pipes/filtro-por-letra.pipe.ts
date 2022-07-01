import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../todo-list/interfaces/todo';

@Pipe({
  name: 'filtroPorLetra'
})
export class FiltroPorLetraPipe implements PipeTransform {

  transform(items: Todo[], value: string): any {


  console.log(items );

    if (items.length === 0 || !items) {
      return items;
    }

    return items.filter(item => item.description.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

}
