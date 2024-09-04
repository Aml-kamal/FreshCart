import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
Router
@Component({
  selector: 'app-req-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './req-order.component.html',
  styleUrl: './req-order.component.scss'
})
export class ReqOrderComponent {
  isLoading:boolean =false

constructor(private _OrdersService:OrdersService ,private _ActivatedRoute:ActivatedRoute,private _Router:Router){}
userDataForm:FormGroup=new FormGroup ({
  details:new FormControl (null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  phone:new FormControl (null,[Validators.required,Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]),
  city:new FormControl (null,[Validators.required,Validators.pattern(/^\s*[a-zA-Z][0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/)]),

})
checkOut(){
  this.isLoading =true

  this._ActivatedRoute.paramMap.subscribe((p)=>{
    this._OrdersService.reqOrderAPI(  p.get('cartId')! ,this.userDataForm.value).subscribe({
      next:(res)=>{
                  window.open(res.session.url,'_self')

        
console.log(res.session.url);
this.isLoading =false

      },
      error:(err)=>{
        this.isLoading =false

      }
    })

  })
}
}
