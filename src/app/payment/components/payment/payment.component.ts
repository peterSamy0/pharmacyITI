import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  // paymentData: any = {}; // Object to store payment form data

  // constructor(private paymentService: PaymentService) { }

  // onSubmit(paymentForm: NgForm) {
  //   if (paymentForm.valid) {
  //     this.paymentService.processPayment(this.paymentData)
  //       .then(paymentId => {
  //         console.log('Payment successful. Payment ID:', paymentId);
  //         // Add any additional logic or navigation upon successful payment
  //       })
  //       .catch(error => {
  //         console.error('Payment failed:', error);
  //         // Add any error handling or display error message to the user
  //       });
  //   }
  // }
}