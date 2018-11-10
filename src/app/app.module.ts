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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from './icons/icons.module';

import { AgmCoreModule } from '@agm/core';
import { AboutUsComponent } from './about-us/about-us.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NouisliderModule } from 'ng2-nouislider';
import { TrackOrderComponent } from './track-order/track-order.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AdminComponent } from './admin/admin.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';
import {ShareDataService} from './service/share-data.service';
import { AddProductComponent } from './add-product/add-product.component';
import {EditProductRenderer} from './ag-grid-cell-renderer/edit-product-renderer.component';
import { EditProductComponent } from './modals/edit-product/edit-product.component';
import { BlogComponent } from './blog/blog.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { FaqComponent } from './faq/faq.component';

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
    CheckoutComponent,
    TrackOrderComponent,
    ClickOutsideDirective,
    AdminComponent,
    AddProductComponent,
    EditProductRenderer,
    EditProductComponent,
    BlogComponent,
    OrderSummaryComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    NgbModule.forRoot(),
    IconsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxvYtDTatk_zaKrQ3JmC2fQ_TflTK5Gcw&libraries=geometry'
    }),
    NouisliderModule,
    AgGridModule.withComponents([AdminComponent]),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToasterModule,
    AgGridModule.withComponents([EditProductRenderer])
  ],
  providers: [ShareDataService], 
  entryComponents: [EditProductComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
