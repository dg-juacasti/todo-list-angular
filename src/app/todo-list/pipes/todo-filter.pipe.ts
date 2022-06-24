import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../interfaces";

@Pipe({
  name: "todoFilter",
})
export class TodoFilterPipe implements PipeTransform {
  transform(
    todos: Todo[],
    searchString: string,
    showAll: boolean = true
  ): Todo[] {
    return todos.filter((todo) => {
      const nameCondition: boolean = todo.description
        .toLowerCase()
        .includes(searchString.toLowerCase());

      if (showAll) {
        return nameCondition;
      }

      const statusCondition: boolean = todo.status === 0;

      return nameCondition && statusCondition;
    });
  }
}
