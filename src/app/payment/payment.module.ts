import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here
import { PaymentComponent } from './components/payment/payment.component';
import { RouterModule } from '@angular/router';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule,
    
  ],
  exports: [
    RouterModule
  ]
})
export class PaymentModule { }