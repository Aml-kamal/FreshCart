import { CategoryService } from './../../../shared/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../shared/services/interfaces/category';

@Component({
  selector: 'app-categoryslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss'
})
export class CategorysliderComponent implements OnInit {
  isLoading:boolean=false
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 10000,

    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: true
  }
  categoryList!:Category[]
  constructor(private _CategoryService:CategoryService){}
ngOnInit(): void {
  this.getAllCategories();
}
getAllCategories(){
  this.isLoading=true
this._CategoryService.getAllCategory().subscribe({
  next:(res)=>{
this.categoryList=res.data
this.isLoading=false
  },
  error:(err)=>{
    this.isLoading=false
  }
})
}
}
