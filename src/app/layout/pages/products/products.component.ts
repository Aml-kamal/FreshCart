import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from './../../../shared/services/interfaces/product';
import { Component } from '@angular/core';
import { SearchPipe } from '../../../shared/pipes/onSale/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

ProductsService
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe ,SearchPipe,FormsModule,RouterLink ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  inSearch:string='';
  errMessage :string='';
  wishId:string[]=[];
  isLoading:boolean=false;
  allProducts:Product[]=[];

  constructor(private _AuthService:AuthService,private _WishListService:WishListService,private _ProductsService:ProductsService,private _CartService:CartService ,private _ToastrService:ToastrService ){}
  
  ngOnInit():void{
    if(typeof localStorage != 'undefined'){
      localStorage.setItem('currentPage','/products');
      const wishListStorage= localStorage.getItem('wishId');
      if(wishListStorage){
        this.wishId=JSON.parse(wishListStorage)
      }

    }
    this.isLoading=true
    this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{

  this.allProducts=res.data
  this.isLoading=false

      },
      error:(err)=>{
        this.errMessage=err.error.message
        this.isLoading=false

      }
      
    })
  }
  addToCartBtn(pId:string){
    this._CartService.addCartAPI(pId).subscribe((res)=>{
        this._ToastrService.success(res.message,res.status,{progressBar:true})
        this._AuthService.cartNumber.next(res.numOfCartItems)
      }
    )
  }
  addToWishList(pId:string){
    this._WishListService.addToWishList(pId).subscribe({
  next:(res)=>{
    if('data' in res){
      this.wishId=res.data || [];
  localStorage.setItem('wishId',JSON.stringify(this.wishId));
    }
    if('status' in res){
      this._ToastrService.success(res.message,res.status,{progressBar:true});
    }
  }
    })
  }
  removeFromWishList(id:string)
{
this._WishListService.removeWishList(id).subscribe({

  next:(res)=>{
    if(Array.isArray(res.data)){
      this.wishId=res.data
    }else{
      this.wishId=[]
    }
    localStorage.setItem('wishId',JSON.stringify(this.wishId));
    this._ToastrService.warning(res.message,res.status,{progressBar:true})
  }
})
}
}