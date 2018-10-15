import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { VisitUsComponent } from './visit-us/visit-us.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import {AdminComponent} from './admin/admin.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'visit-us', component: VisitUsComponent },
  { path: 'customer-care', component: CustomerCareComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'view-cart', component: ViewCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'track-order', component: TrackOrderComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
 imports: [RouterModule.forRoot(appRoutes,{useHash: true})], 
 exports: [RouterModule]
})


export class AppRoutingModule { 

}
