import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term:String): any {     
        return items.filter(item =>
            Object.keys(item).some(
              k =>
                item[k] != null &&
                item[k]
                  .toString()
                  .toUpperCase()
                  .includes(term.toUpperCase())
            )
          );
    }
}