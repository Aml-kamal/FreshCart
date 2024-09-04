import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isCodeForm:boolean =false;
  isNewPassword:boolean=false;
  isLoading:boolean =false;
  errMessage!:string;
constructor(private _AuthService:AuthService , private _Router:Router){}
emailForm :FormGroup = new FormGroup ({
  email :new FormControl(null , [Validators.required ,Validators.email]),
});
codeForm :FormGroup = new FormGroup ({
  resetCode :new FormControl(null , [Validators.required]),
});
resetPassForm :FormGroup = new FormGroup ({
  email :new FormControl(null , [Validators.required ,Validators.email]),
  newPassword :new FormControl(null ,[Validators.required,Validators.pattern(/^[A-Z][0-9]{6}/)])
})



verifyBtn(){
  this.isLoading=true
this._AuthService.sendVerifyAPI(this.emailForm.value).subscribe({
  next: (res)=>{
    if(res.statusMsg =='success'){
      this.isCodeForm=true,
      this.isLoading=false
    }
  },
  error:(err)=>{
    this.errMessage=err.error.message,
    this.isLoading =false

  }
})
}
codeBtn(){
  this.isLoading=true
this._AuthService.sendCodeAPI(this.codeForm.value).subscribe({
  next:(res)=>{
    if(res.statusMsg=='success'){
      this.isLoading=false,
      this.isCodeForm=false,
      this.isNewPassword=true

    }
  },
  error:(err)=>{
    this.errMessage=err.error.message,
    this.isLoading =false


  }
})
}
newPassBtn(){
  this.isLoading =true
  this._AuthService.sendLogin(this.resetPassForm.value).subscribe({

  next :(res)=>{
      this.isLoading =false
      if(typeof localStorage != 'undefined'){
        localStorage.setItem('userToken',res.token);
      }
this._AuthService.userForm()
      this._Router.navigate(['home'])

      },
    error: (err)=>{   
        this.errMessage=err.error.message,
        this.isLoading =false

    }
  })
}
}
