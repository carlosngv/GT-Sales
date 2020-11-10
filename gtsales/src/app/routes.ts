import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { ProfileComponent } from './components/profile/profile.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ToptCreditsComponent } from './components/top-credits/topt-credits.component';
import { TopComplaintsComponent } from './components/top-complaints/top-complaints.component';
import { TopLikesComponent } from './components/top-likes/top-likes.component';
import { TopDislikesComponent } from './components/top-dislikes/top-dislikes.component';
import { TopPublicationsComponent } from './components/top-publications/top-publications.component';


import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'profile', component:ProfileComponent ,canActivate:[AuthGuard]},
    { path: 'myProducts', component:MyProductsComponent ,canActivate:[AuthGuard]},
    { path: 'productDetail/:id/:pdid', component:ProductDetailComponent ,canActivate:[AuthGuard]},
    { path: 'products', component:ProductsComponent ,canActivate:[AuthGuard]},
    { path: 'shoppingCart', component:ShoppingCartComponent ,canActivate:[AuthGuard]},
    { path: 'admin/main', component:AdminComponent },
    { path: 'admin/reports', component:ReportsComponent },
    { path: 'admin/reports/topComplaints', component:TopComplaintsComponent },
    { path: 'admin/reports/topCredits', component:ToptCreditsComponent},
    { path: 'admin/reports/topLikes', component:TopLikesComponent },
    { path: 'admin/reports/topDislikes', component:TopDislikesComponent},
    { path: 'admin/reports/topPublications', component:TopPublicationsComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];