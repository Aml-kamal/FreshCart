import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Orders } from '../../../shared/services/interfaces/allOrders';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit{
allOrders!:Orders[]|[];
isLoading:boolean=false;
errMessage!:string;


private readonly  _PLATFORM_ID= inject(PLATFORM_ID);
constructor(private _OrdersService:OrdersService , private _AuthService:AuthService){}
userId=localStorage.getItem('userId')!;

ngOnInit(): void {
  if(isPlatformBrowser(this._PLATFORM_ID)){
    localStorage.setItem('currentPage','/allorders')
  };
  this.isLoading=true

  this.getAllOrders()

}
getAllOrders(){
this._OrdersService.getAllOrders(this.userId).subscribe({
  next:(res)=>{
    console.log(res);
    this.allOrders=res;
    this.isLoading=false;

  },
  error:(err)=>{
    this.isLoading=false;
    this.errMessage=err.error.message;

  }
})
}
}
