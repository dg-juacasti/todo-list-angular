import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../todo-list/interfaces/todo';


@Pipe({
    name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

    transform(array: Todo[], searchTask?: string): Todo[] {

        let returnArray: Todo[];

        returnArray = array;


        if (!array) {
            return array;
        } else{
            returnArray = returnArray.filter(({description}) =>
                description.includes(searchTask)
            );

        }

        return  returnArray;
    }

}
