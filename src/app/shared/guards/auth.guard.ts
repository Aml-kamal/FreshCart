import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { platform } from 'process';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  let _AuthService:AuthService=inject(AuthService);
  let _Router:Router=inject(Router);
  const _PLATFORM_ID=inject(PLATFORM_ID)
if(isPlatformBrowser(_PLATFORM_ID)){
  if(localStorage.getItem('userToken')!=null){
    _AuthService.userForm()
return true;
  }else{
    _Router.navigate(['/login'])
  return false;   
  }

}
else{
  return false
} 
 

};
