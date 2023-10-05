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
import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { PharmacyDetailsModule } from './pharmacy/pharmacy-details.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingRoutingModule,
    PharmacyDetailsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
