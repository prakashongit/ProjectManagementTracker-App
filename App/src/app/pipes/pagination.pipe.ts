import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], pageNumber: number, perPage: number): any[] {
    if(value && value.length > 0){
      let startindex:number = pageNumber == 1? 0 : (pageNumber-1)*perPage;
      return value.slice(startindex, pageNumber*perPage);
    }
    return value;
  }

}
