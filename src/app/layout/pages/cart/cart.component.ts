import { Cart } from './../../../shared/services/interfaces/cart';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
PLATFORM_ID
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  isLoading:boolean=false;
  myCart!:Cart;
  cartId!:string;
  errMessage!:string;
constructor(private _CartService:CartService , private _ToastrService:ToastrService,private _AuthService:AuthService,private _Router:Router ){}
 
private readonly  _PLATFORM_ID= inject(PLATFORM_ID);

ngOnInit():void{

    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('currentPage','/cart')

    };
    this.isLoading=true
this._CartService.getCartAPI().subscribe({

next:(res)=>{
  this.cartId=res.data._id
this.myCart= res
  this.isLoading=false
},
error:(err)=>{
  this.isLoading=false
  this.errMessage=err.error.message

}
}
)


  }
 
  updateOneProduct(currentCount:number,pId:string){
  
this._CartService.updateCartAPI(currentCount.toString(),pId).subscribe((res)=>{
  
  this._ToastrService.success("Cart Updated Successfully")
  this.myCart=res
  this._AuthService.cartNumber.next(res.numOfCartItems)

})
  }

 removeProduct(pId:string){
  this._CartService.removeCartAPI(pId).subscribe((res)=>{
  
            this._ToastrService.warning("Item Deleted Successfully",res.status,{progressBar:true});

this.myCart=res
this._AuthService.cartNumber.next(res.numOfCartItems)
      

  })

 }
 clearAllCart(){
  this._CartService.clearCartAPI().subscribe({
    next:(res)=>{
      if(res.message="success"){
        this._ToastrService.warning("All Cart Deleted Successfully",res.status,{progressBar:true});
        this.myCart={} as Cart
        this._AuthService.cartNumber.next(0)
        this._Router.navigate(['/home'])
      }
      



    },
    error:(err)=>{
this.errMessage=err.message
    }
  })
 }
}

   
    

  