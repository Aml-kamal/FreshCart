import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../Base/Environment';
@Injectable({
  providedIn: 'root'
})
export class WishListService {


constructor(private _HttpClient:HttpClient) { }



userTokenHeaders:any={token:localStorage.getItem("userToken")||''};
addToWishList(pId:string):Observable<any>
  {
return this._HttpClient.post(`${Environment.baseURL}/api/v1/wishlist`,{productId:pId},{
  headers :this.userTokenHeaders

}
)
  };
  getWishListApi():Observable<any>
  {
return this._HttpClient.get(`${Environment.baseURL}/api/v1/wishlist`,{
  headers :this.userTokenHeaders

}
)
  };
  removeWishList(id:string):Observable<any>
  {
return this._HttpClient.delete(`${Environment.baseURL}/api/v1/wishlist/${id}`,{
  headers :this.userTokenHeaders

}
)
  };
}
