import { Data } from './../../../shared/services/interfaces/data';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { WishList } from '../../../shared/services/interfaces/wish-list';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
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
  myWishList!:WishList[]|[];
  wishId:string[]=[];
  isLoading:boolean=false;
 errMessage!:string
  
  constructor(private _ActivatedRoute:ActivatedRoute,private _WishListService:WishListService , private _ToastrService:ToastrService,private _CartService:CartService,private _AuthService:AuthService ){}
  private readonly  _PLATFORM_ID= inject(PLATFORM_ID);

  ngOnInit():void{

    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('currentPage','/wishList')

    };
    this.getLoggedUserWishList();
   
    
      };
  getLoggedUserWishList(){
    this.isLoading=true;
    this._WishListService.getWishListApi().subscribe({
      next:(res)=>{
        this.myWishList=res.data;
        this.isLoading=false;

      },
      error:(err)=>{
this.errMessage=err.error.message;
this.isLoading=false;

      }
    })
  }
  removeWishList(id:string){
   this._WishListService.removeWishList(id).subscribe({
    next:(res)=>{
      this._ToastrService.warning(res.message,res.status,{progressBar:true});
      this._WishListService.getWishListApi().subscribe({
        next:(res)=>{
          this.myWishList=res.data
        },
      });
      if(Array.isArray(res.data)){
        this.wishId=res.data;
      }else{
        this.wishId=[];
      }
      localStorage.setItem('wishId',JSON.stringify(this.wishId))
    }
   });


  
   };

   addToCartBtn(pId:string){
    this._CartService.addCartAPI(pId).subscribe({
    next:(res)=>{
    
    if('status' in res){
      this._AuthService.cartNumber.next(res.numOfCartItems);
      this._ToastrService.success(res.message,res.status,{progressBar:true});
      this.removeWishList(pId);
    }
    }
    }
    )
  }
}
