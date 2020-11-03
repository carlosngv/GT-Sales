import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material/material.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

import { HttpClientModule } from "@angular/common/http";

import { baseURL } from './shared/baseURL';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginValidationComponent } from './components/login-validation/login-validation.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { PublicationComponent } from './components/publication/publication.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductsComponent } from './components/products/products.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    LoginValidationComponent,
    EmailVerificationComponent,
    MyProductsComponent,
    PublicationComponent,
    ProductDetailComponent,
    NewProductComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: 'baseURL', 
      useValue: baseURL
    }
  ],
  entryComponents: [
    LoginComponent, // Always include dialogs here to use it as an overlay on top of the current screen
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
