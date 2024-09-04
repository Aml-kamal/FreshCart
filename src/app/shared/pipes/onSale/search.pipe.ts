import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../services/interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList:Product[],term:string): Product[] {
    return productList.filter((prod)=>{
      return prod.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    });
  }

}
