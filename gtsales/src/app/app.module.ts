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
import { ChatComponent } from './components/chat/chat.component';
import { ComplaintFormComponent } from './components/complaint-form/complaint-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NewPurchaseComponent } from './components/new-purchase/new-purchase.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ToptCreditsComponent } from './components/top-credits/topt-credits.component';
import { TopComplaintsComponent } from './components/top-complaints/top-complaints.component';
import { TopLikesComponent } from './components/top-likes/top-likes.component';
import { TopDislikesComponent } from './components/top-dislikes/top-dislikes.component';
import { TopPublicationsComponent } from './components/top-publications/top-publications.component';
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
    ChatComponent,
    ComplaintFormComponent,
    ShoppingCartComponent,
    NewPurchaseComponent,
    AdminComponent,
    ReportsComponent,
    ToptCreditsComponent,
    TopComplaintsComponent,
    TopLikesComponent,
    TopDislikesComponent,
    TopPublicationsComponent,
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
