import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term:String): any {      
        return term 
            ? items.filter(item => item.result.toUpperCase().indexOf(term.toUpperCase()) !== -1)
            : items;
    }
}