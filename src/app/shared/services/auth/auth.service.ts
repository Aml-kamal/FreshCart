import { Router } from '@angular/router';
import { Data, Login, Email, Code } from './../interfaces/data';
import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { Environment } from '../../../Base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
Router
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)
  userData :BehaviorSubject<any>=new BehaviorSubject(null)
  constructor(private _HttpClient: HttpClient , private _Router:Router) {
   


    afterNextRender(()=>{
  
      if(localStorage.getItem('userToken')!==null){
        this.userForm();
        // _Router.navigate([localStorage.getItem('currentPage')])
      }
    })
  }

  sendRegister(data: Data):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/signup `, data);
  }

  sendLogin(data: Login):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/signin`, data);
  }

  userForm(){
     this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem('userToken')))) ;
     console.log(this.userData.getValue()?.id!);
     console.log(this.userData.getValue()?.id!);
     
localStorage.setItem('userId',this.userData.getValue()?.id!);
  }


  sendVerifyAPI(data:Email):Observable<any>{
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/forgotPasswords`,data)
  };
  sendCodeAPI(data:Code):Observable<any>{
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/forgotPasswords`,data)
  };
  sendVewPasswordAPI(data:Login):Observable<any>{
    return this._HttpClient.put(`${Environment.baseURL}/api/v1/users/changeMyPassword`,data)
  };
  
}
