import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module'; 
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PharmacyDetailsModule } from './pharmacy/pharmacy-details.module';
import { CartModule } from './cart/cart.module';
import { PharmacistHomeModule } from './pharmacist-home/pharmacist-home.module';
import { ProfileComponent } from './profile/profile.component';
// import { GovernorateComponent } from './governorate/governorate.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfileModule } from './profile/profile.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';

// import { PaymentModule } from './payment/payment.module';

// import { CityComponent } from './city/city.component';
// import { SearchPharmaciesPipe } from './pipes/search-pharmacies.pipe';
// import { SearchPharmaciesPipe } from './search-pharmacies.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProfileComponent,
    ContactUsComponent,
    AboutUsComponent,
    // CityComponent,
    // GovernorateComponent
    // SearchPharmaciesPipe,
    // SearchPharmaciesPipe,
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
    PharmacistHomeModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    ProfileModule,
    // PaymentModule
    // AuthModule
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
