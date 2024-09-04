import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
isLogin!:boolean


readonly _AuthService = inject(AuthService);
private readonly _Router = inject(Router);
private readonly _FlowbiteService = inject(FlowbiteService);
// private readonly  _CartService= inject(CartService);

  countCart:number=0

ngOnInit():void{
  //هنا بيظهر ايرور لما انادي cart.services=>
// this._CartService.getCartAPI().subscribe({
// next:(res)=>{
//  this._AuthService.cartNumber.next(res.numOfCartItems)
// }
// });
  this._AuthService.cartNumber.subscribe({
    next:(res)=>{
      this.countCart=res;

    }
  });


  this._FlowbiteService.loadFlowbite(flowbite => {
    // Your custom code here
  });

this._AuthService.userData.subscribe(()=>{
  if(this._AuthService.userData.getValue()==null){
    this.isLogin=false
  }
  else{
    this.isLogin=true
  }
});

}
logout(){
  localStorage.removeItem("userToken");
  this._AuthService.userData.next(null);
  this._Router.navigate(['/login']);
  localStorage.removeItem('userId');
  localStorage.removeItem('wishId')
}

}
