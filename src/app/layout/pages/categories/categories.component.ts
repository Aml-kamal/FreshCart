import { RouterLink } from '@angular/router';
import { Category } from './../../../shared/services/interfaces/category';
import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  isLoading:boolean=false;
  mySubCategory:Category[]=[];
  allCategory:Category[]=[];
constructor(private _CategoryService:CategoryService){}
  ngOnInit():void{
    if(typeof localStorage != 'undefined'){
      localStorage.setItem('currentPage','/categories')
    }
    this.isLoading=true

    this._CategoryService.getAllCategory().subscribe({
      next:(res)=>{
        console.log(res.data);
        
        this.allCategory=res.data
        this.isLoading=false

            },
            error:(err)=>{
              this.isLoading=false

            }
    })
  }
  getAllSubCat(catId:string){
    this._CategoryService.getAllSubCatInCategory(catId).subscribe({
      next:(res)=>{
        this.mySubCategory=res.data
      },
      error:(err)=>{
  
      }
  
    })
  }
}
