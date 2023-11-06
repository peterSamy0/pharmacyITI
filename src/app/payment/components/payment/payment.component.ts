import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { ApiService } from 'path-to-your-api-service'; // Import your API service for payment processing

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  // paymentForm: FormGroup;

  // constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
  //   this.paymentForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     name: ['', Validators.required],
  //     cardNumber: ['', Validators.required],
  //     exp: ['', Validators.required],
  //     cvv: ['', Validators.required]
  //   });
  // }

  // onSubmit() {
  //   if (this.paymentForm.valid) {
  //     // You can access the payment details from this.paymentForm.value
  //     const paymentDetails = this.paymentForm.value;

  //     // Send the payment details to your server or payment gateway for processing
  //     this.apiService.processPayment(paymentDetails).subscribe(
  //       (response: any) => {
  //         // Payment was successful
  //         console.log('Payment successful:', response);

  //         // You can optionally navigate to a confirmation page
  //         this.router.navigate(['/payment-confirmation']);
  //       },
  //       (error: any) => {
  //         // Payment failed
  //         console.error('Payment failed:', error);
  //       }
  //     );
  //   }
  // }
  // alertConfirmation() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This process is irreversible.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, go ahead.',
  //     cancelButtonText: 'No, let me think',
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire('Removed!', 'Product removed successfully.', 'success');
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire('Cancelled', 'Product still in our database.)', 'error');
  //     }
  //   });
  // }
}
