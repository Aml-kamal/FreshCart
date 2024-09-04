import { ToastrService } from 'ngx-toastr';
import { Product } from './../../../shared/services/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../shared/services/cart/cart.service';
import { AuthService } from '../../../shared/services/auth/auth.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
   
    },
    nav: true
  }
  myProducts!:Product
  pId:string|null=''
constructor(private _ActivatedRoute:ActivatedRoute ,private _ProductsService:ProductsService, private _CartService:CartService,private _ToastrService:ToastrService ,private _AuthService:AuthService){}
ngOnInit():void{
 
  this._ActivatedRoute.paramMap.subscribe((p)=>{
    this.pId=p.get('id');
    this._ProductsService.getSpeProducts(this.pId).subscribe({
      next:(res)=>{
        this.myProducts=res.data
      },
      error:(err)=>{

      }
    })
  })
}
addToCartBtn(aId:string){
  this._CartService.addCartAPI(aId).subscribe((res)=>{
      this._ToastrService.success(res.message)
      this._AuthService.cartNumber.next(res.numOfCartItems)
      console.log(this._AuthService.cartNumber)
    }
  )
}
}
