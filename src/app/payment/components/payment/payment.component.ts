import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  @ViewChild('cardElement')
  cardElement!: ElementRef;
  paymentForm: FormGroup;
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.paymentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      exp: ['', Validators.required], // Add this line for the 'exp' field
      cvv: ['', Validators.required], // Add this line for the 'cvv' field

    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51OAJmQIjYA1iuKSADjQU12ZvCU2S51PFLNZjJutxbNbkxL2VL26zr8GVdlC9f1uTiE5ZyNFRPbdoGUqOshCFQ9LR00sDAlY7vq');
  }

  async ngAfterViewInit() {
    if (this.stripe) {
      const elements: StripeElements = this.stripe.elements();
      this.card = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
          },
        },
      });
  
      if (this.card) {
        this.card.mount(this.cardElement.nativeElement);
      } else {
        console.error('Stripe Card Element is null. Check your Stripe setup.');
      }
    } else {
      console.error('Stripe is not initialized. Check your Stripe setup.');
    }
  }

  async submitPayment() {
    try {
      const stripe = this.stripe;
      if (stripe && this.card) {
        const { token, error } = await stripe.createToken(this.card);

        if (error) {
          console.error(error);
        } else {
          this.http.post('http://localhost:8000/api/payment/process', { token: token.id, secretKey: 'sk_test_51OAJmQIjYA1iuKSAYbGwvYX1eWgHH0nbJaHqeq8s9nFpEfNTA1iu0SjpLISNTU7TGBqiD11Jt6M9zGsHu3rfcjrD005tMFIUac' }).subscribe(
            (response) => {
              console.log('Payment successful', response);
              // Redirect to the order status page
            },
            (error) => {
              console.error('Payment error', error);
            }
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
