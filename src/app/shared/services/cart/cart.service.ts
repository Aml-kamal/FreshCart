import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private _HttpClient:HttpClient) { }
  userTokenHeaders:any={token:localStorage.getItem("userToken")||''};
  addCartAPI(pId:string):Observable<any>
  {
return this._HttpClient.post(`${Environment.baseURL}/api/v1/cart`,{productId:pId},{
  headers :this.userTokenHeaders

}
)
  };
  updateCartAPI(countNum:string,pId:string):Observable<any>
  {
return this._HttpClient.put(`${Environment.baseURL}/api/v1/cart/${pId}`,{count:countNum},{
  headers :this.userTokenHeaders

}
)
  };
  getCartAPI():Observable<any>
  {
return this._HttpClient.get(`${Environment.baseURL}/api/v1/cart`,{
  headers :this.userTokenHeaders

}
)
  };
  removeCartAPI(pId:string):Observable<any>
  {
return this._HttpClient.delete(`${Environment.baseURL}/api/v1/cart/${pId}`,{
  headers :this.userTokenHeaders

}
)
  };
  clearCartAPI():Observable<any>
  {
return this._HttpClient.delete(`${Environment.baseURL}/api/v1/cart`,{
  headers :this.userTokenHeaders

}
)
  };
}
