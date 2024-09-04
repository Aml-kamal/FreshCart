import { ProductsComponent } from './../products/products.component';
import { Product } from './../../../shared/services/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../../shared/pipes/onSale/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { HomesliderComponent } from '../../aditions/homeslider/homeslider.component';
import { CategorysliderComponent } from '../../aditions/categoryslider/categoryslider.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink ,CarouselModule  ,SearchPipe, FormsModule,CurrencyPipe, HomesliderComponent,CategorysliderComponent,ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  inSearch:string=''
  isLoading:boolean=false


  errMessage :string=''
  wishId:string[]=[]

  allProducts:Product[]=[]
constructor(private _WishListService:WishListService, private _ProductsService:ProductsService ,private _CartService:CartService ,private _ToastrService:ToastrService ,private _AuthService:AuthService){}
ngOnInit():void{
  if(typeof localStorage != 'undefined'){
    localStorage.setItem('currentPage','/home')
  }
  this.isLoading=true

  this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
console.log(res.data);

this.allProducts=res.data
this.isLoading=false

    },
    error:(err)=>{
      this.errMessage=err.error.message
      this.isLoading=false

    }
    
  })
}


    
    // (res)=>{
    //   console.log(res.message);
    //   console.log(this.wishId);
      
    //   // this._ToastrService.success(res.message)
    //   // =res.data._id
    //   if(this.wishId=null){
    //     this._ToastrService.success( 'Product already added successfully to your wishlist');

    //   }else{
    //     this._ToastrService.success(res.message);

    //   }

    // }

}
