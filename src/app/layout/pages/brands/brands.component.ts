import { Brands } from './../../../shared/services/interfaces/brands';
import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  isLoading:boolean=false
  myBrands:Brands[]=[]
constructor(private _BrandsService:BrandsService){}
  ngOnInit():void{
    if(typeof localStorage != 'undefined'){
      localStorage.setItem('currentPage','/brands')
    }
    this.isLoading=true

    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
console.log(res.data);
this.myBrands=res.data
this.isLoading=false

      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false

      }
    })
  }
  
}
