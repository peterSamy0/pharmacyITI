import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from 'ngx-stripe'; // Removed unnecessary import
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentStatus: string = '';
  paymentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cardHolder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      exp: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  async submitPayment() {
    const card = this.paymentForm.get('cardNumber')!.value;
    
    this.stripeService.createToken(card).subscribe(
      (tokenResult: any) => {
        const token = tokenResult?.token?.id;
  
        if (token) {
          const formData = {
            email: this.paymentForm.get('email')!.value,
            cardHolder: this.paymentForm.get('cardHolder')!.value,
            token: token
          };
  
          this.http.post('http://localhost:8000/api/process-payment', formData)
            .subscribe(
              (response: any) => {
                // Handle successful response
                this.paymentStatus = response.message;
  
                // Display order status to the user
                if (response.orderStatus === 'Order Verified and Validated') {
                  this.paymentStatus += ' - ' + response.orderStatus;
                } else {
                  this.paymentStatus += ' - ' + response.orderStatus;
                }
              },
              (error) => {
                // Handle error response
                console.error(error);
                this.paymentStatus = 'Error processing payment.';
              }
            );
        } else {
          // Handle the case where the token is not available
          console.error('Token not available');
        }
      },
      (error) => {
        // Handle error during token creation
        console.error(error);
        this.paymentStatus = 'Error processing payment.';
      }
    );
  }
}
