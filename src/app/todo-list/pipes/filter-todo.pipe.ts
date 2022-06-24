import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../interfaces/todo';

@Pipe({
    name: 'filterTodo'
})
export class FilterTodo implements PipeTransform {

    transform(array: Todo[], search?: string, filter?: number): Todo[] {

        let returnArray: Todo[] = array;
        if (!array) {
            return returnArray;
        } else {
            search = search.toUpperCase();
            returnArray = returnArray?.filter(({description}) =>
                description.toUpperCase().includes(search)
            );
            if (filter !== undefined) {
                returnArray = returnArray?.filter(({status}) => {
                        if (status === 1) {
                            return true;
                        } else {
                            return status === filter;
                        }
                    }
                );
            }

        }

        console.log(returnArray);
        return returnArray;
    }

}
