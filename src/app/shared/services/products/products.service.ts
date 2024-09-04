import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../Base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  getAllProducts():Observable<any>
  {
   return this._HttpClient.get(`${Environment.baseURL}/api/v1/products`)
  }
  getSpeProducts(pId:string|null):Observable<any>
  {
   return this._HttpClient.get(`${Environment.baseURL}/api/v1/products/${pId}`)
  }
}
