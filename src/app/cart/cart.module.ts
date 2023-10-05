import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartpageComponent } from './cartpage/cartpage.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CartpageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ]
})
export class CartModule { }
