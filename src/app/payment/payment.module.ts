import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here
import { PaymentComponent } from './components/payment/payment.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: [
    PaymentComponent,
    RouterModule
  ]
})
export class PaymentModule { }