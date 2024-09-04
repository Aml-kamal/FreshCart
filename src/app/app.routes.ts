import { Routes } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { NotfoundComponent } from './layout/aditions/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetPasswordComponent } from './layout/aditions/forget-password/forget-password.component';
import { ProductDetailsComponent } from './layout/aditions/product-details/product-details.component';
import { ReqOrderComponent } from './layout/aditions/req-order/req-order.component';
import { AllOrdersComponent } from './layout/aditions/all-orders/all-orders.component';

export const routes: Routes = [
    {path:"",redirectTo:"home", pathMatch:"full"},

    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"forgetPassword",component:ForgetPasswordComponent},

    {path:"home",component:HomeComponent ,canActivate :[authGuard]},
    {path:"cart",component:CartComponent ,canActivate :[authGuard]},
    {path:"categories",loadComponent:()=>import('./layout/pages/categories/categories.component').then((c)=>c.CategoriesComponent),canActivate :[authGuard]},
    {path:"products",loadComponent:()=>import('./layout/pages/products/products.component').then((c)=>c.ProductsComponent) ,canActivate :[authGuard]},
    {path:"brands",loadComponent :()=>import('./layout/pages/brands/brands.component').then((c)=>c.BrandsComponent) ,canActivate :[authGuard]},
    {path:"wishList",loadComponent :()=>import('./layout/pages/wish-list/wish-list.component').then((c)=>c.WishListComponent) ,canActivate :[authGuard]},

    {path:"allorders",component: AllOrdersComponent ,canActivate :[authGuard]},

    {path:"productDetails/:id",component:ProductDetailsComponent ,canActivate :[authGuard]},
    {path:"reqOrder/:cartId",component:ReqOrderComponent ,canActivate :[authGuard]},

    {path:"**",component:NotfoundComponent},


];
