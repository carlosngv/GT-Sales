import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { ProfileComponent } from './components/profile/profile.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'profile', component:ProfileComponent ,canActivate:[AuthGuard]},
    { path: 'myProducts', component:MyProductsComponent ,canActivate:[AuthGuard]},
    { path: 'productDetail', component:ProductDetailComponent ,canActivate:[AuthGuard]},
    { path: 'products', component:ProductsComponent ,canActivate:[AuthGuard]},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];