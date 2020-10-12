import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'profile/:id', component:ProfileComponent ,canActivate:[AuthGuard]},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];