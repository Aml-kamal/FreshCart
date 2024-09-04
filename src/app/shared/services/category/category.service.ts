import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../Base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }
  getAllCategory():Observable<any>{

 return   this._HttpClient.get(`${Environment.baseURL}/api/v1/categories`)
  }
  getSpeCategory(pId:string|null):Observable<any>{
  return  this._HttpClient.get(`${Environment.baseURL}/api/v1/categories/${pId}`)
  }
  getSubCategory():Observable<any>{
   return this._HttpClient.get(`${Environment.baseURL}/api/v1/subcategories`)
  }
  getAllSubCatInCategory(category:string):Observable<any>{
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/categories/${category}/subcategories`)
  }
}
