import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { VisitUsComponent } from './visit-us/visit-us.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IconsModule} from './icons/icons.module'

import { AgmCoreModule } from '@agm/core';
import { AboutUsComponent } from './about-us/about-us.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    CustomerCareComponent,
    VisitUsComponent,
    ShopComponent,
    HomeComponent,
    FooterComponent,
    AboutUsComponent,
    PasswordRecoveryComponent,
    ProfilePageComponent,
    ViewCartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IconsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxvYtDTatk_zaKrQ3JmC2fQ_TflTK5Gcw&libraries=geometry'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
