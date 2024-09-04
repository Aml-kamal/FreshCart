import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../Base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }
  getAllBrands():Observable<any>
  {
   return this._HttpClient.get(`${Environment.baseURL}/api/v1/brands`)
  }
  getSpeBrands(pId:string|null):Observable<any>
  {
   return this._HttpClient.get(`${Environment.baseURL}/api/v1/brands/${pId}`)
  }
}
