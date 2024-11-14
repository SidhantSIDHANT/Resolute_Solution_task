import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any[], sortBy: string, sortDirection: string): any[] {
    if (!value || !sortBy || !sortDirection) {
      return value;
    }

    const sortedData = [...value]; 
    const isAsc = sortDirection === 'asc';

    sortedData.sort((a, b) => {
      if (a[sortBy] === undefined || a[sortBy] === null) {
        return isAsc ? -1 : 1;
      }
      if (b[sortBy] === undefined || b[sortBy] === null) {
        return isAsc ? 1 : -1;
      }

      if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
        const comparison = a[sortBy].localeCompare(b[sortBy]);
        return isAsc ? comparison : -comparison;
      }

      if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
        return isAsc ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      }

      return 0;
    });

    return sortedData;
  }
}
