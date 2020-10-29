import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { ProfileComponent } from './components/profile/profile.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'profile/:id', component:ProfileComponent ,canActivate:[AuthGuard]},
    { path: 'myProducts/:id', component:MyProductsComponent ,canActivate:[AuthGuard]},
    { path: 'productDetail/:id/:pdid', component:ProductDetailComponent ,canActivate:[AuthGuard]},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];