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
      if (a[sortBy] < b[sortBy]) {
        return isAsc ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  }
}
