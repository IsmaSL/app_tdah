// filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();

        return items.filter(item => {
            return Object.keys(item).some(key => {
                // Verifica si la propiedad es nula o indefinida antes de llamar a toString()
                const value = item[key];
                return value != null && value.toString().toLowerCase().includes(searchText);
                // return item[key].toString().toLowerCase().includes(searchText);
            });
        });
    }
}
