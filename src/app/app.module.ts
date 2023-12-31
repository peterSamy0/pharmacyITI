import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PharmacyDetailsModule } from './pharmacy/pharmacy-details.module';
import { CartModule } from './cart/cart.module';
import { PharmacistHomeModule } from './pharmacist-home/pharmacist-home.module';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfileModule } from './profile/profile.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxStripeModule } from 'ngx-stripe';
// import { PaymentModule } from './payment/payment.module';
// import { PaymentComponent } from './payment/components/payment/payment.component';
import { StripeFactoryService } from 'ngx-stripe';
import { PaymentStripeComponent } from './payment-stripe/payment-stripe.component';
import { SharedModule } from './shared/shared.module';
// import { CamelToRegularPipe } from './pipes/camel-to-regular.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProfileComponent,
    ContactUsComponent,
    AboutUsComponent,
    NotFoundComponent,
    PaymentStripeComponent,
    // CamelToRegularPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PharmacyDetailsModule,
    CartModule,
    RouterModule.forRoot([]),
    PharmacistHomeModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    ProfileModule,
    AuthModule,
    RouterModule,
    AuthModule,
    NgxStripeModule,
    NgxStripeModule.forRoot('pk_test_51OAJmQIjYA1iuKSADjQU12ZvCU2S51PFLNZjJutxbNbkxL2VL26zr8GVdlC9f1uTiE5ZyNFRPbdoGUqOshCFQ9LR00sDAlY7vq'),

  ],
  providers: [StripeFactoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
