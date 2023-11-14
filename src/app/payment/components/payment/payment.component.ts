// // // payment.component.ts
// // import {Component, OnDestroy, OnInit} from '@angular/core';
// import { CommonModule } from '@angular/common';

// import {NgxStripeModule, StripeCardComponent, StripeFactoryService, StripeInstance, StripeService,} from "ngx-stripe";
// import {Subscription, switchMap} from "rxjs";

// import {MatButtonModule} from "@angular/material/button";
// import {MatInputModule} from "@angular/material/input";
// import {HttpClient, HttpResponse} from "@angular/common/http";
// import {FormsModule} from "@angular/forms";
// // declare var paypal;

// import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// import { Stripe, StripeElements, StripeElement, StripeCardElementOptions } from '@stripe/stripe-js';

// // import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// // import { StripeService } from 'ngx-stripe';
// // import { StripeCardElementOptions, StripeElements, StripeElement } from '@stripe/stripe-js';

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { StripeService } from 'ngx-stripe';
import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  // imports: [CommonModule, StripeCardComponent, NgxStripeModule, MatInputModule, MatButtonModule, FormsModule],
})
export class PaymentComponent {

  
}
//   paymentForm: FormGroup;

//   constructor(private fb: FormBuilder, private stripeService: StripeService) {}

//   ngOnInit(): void {
//     this.initializeForm();
//   }

//   initializeForm(): void {
//     this.paymentForm = this.fb.group({
//       // Define your form controls here
//     });
//   }

//   async onSubmit(): Promise<void> {
//     try {
//       const stripe = await this.stripeService.getInstance();

    //   const { error } = await stripe.confirmPayment({
    //     elements: /* Provide your Elements instance here */,
    //     confirmParams: {
    //       return_url: 'https://example.com/return_url',
    //     },
    //   });

    //   if (error) {
    //     // Handle error
    //   } else {
    //     // Handle success, e.g., redirect to return_url
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }}}
  


//  // third try
// implements AfterViewInit {
//   @ViewChild('cardElement')
//   cardElement!: ElementRef;

//   stripe: Stripe | undefined;
//   elements!: StripeElements;
//   card!: StripeElement;

//   errorMessage!: string;

//   ngAfterViewInit() {
//     this.setupStripe();
//   }

//   constructor(private stripeService: StripeService) {}

// async setupStripe() {
//   this.stripe = await this.stripeService.load({ publishableKey: 'YOUR_PUBLISHABLE_KEY' });
//     this.elements = this.stripe.elements();

//     const cardOptions: StripeCardElementOptions = {
//       style: {
//         base: {
//           fontSize: '16px',
//         },
//       },
//     };

//     this.card = this.elements.create('card', cardOptions);
//     this.card.mount(this.cardElement.nativeElement);
//   }

//   async handleSubmit() {
//     if (!this.stripe || !this.elements || !this.card) {
//       return;
//     }

//     const { error } = await this.stripe.confirmCardPayment('YOUR_SECRET_KEY', {
//       payment_method: {
//         card: this.card,
//       },
//       confirmParams: {
//         return_url: 'https://example.com/return_url',
//       },
//     });

//     if (error) {
//       this.errorMessage = error.message;
//     } else {
//       // Handle success, redirect, etc.
//     }
//   }

//   // second try
//   public stripe!: StripeInstance;
//   public stripeAmount!: number;
//   public stripePublicKey = 'pk_test_51OAJmQIjYA1iuKSADjQU12ZvCU2S51PFLNZjJutxbNbkxL2VL26zr8GVdlC9f1uTiE5ZyNFRPbdoGUqOshCFQ9LR00sDAlY7vq';

//   private subscriptions: Subscription;

//   constructor(
//       private http: HttpClient,
//       private stripeFactory: StripeFactoryService,
//   ) {
//     this.subscriptions = new Subscription();
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.unsubscribe();
//   }

//   ngOnInit(): void {
//     // dynamically load the stripe script
//     this.stripe = this.stripeFactory.create(this.stripePublicKey);
//     // stripe amount is in cents, you should multiply your amount by 100
//     this.stripeAmount = 100;
//   }

//   checkout() {
//     const host = 'http://localhost:8000';
//     const checkout: Subscription = this.http.post(host + '/api/createCheckoutSession', {data: {amount: this.stripeAmount * 100}}, {observe: 'response'})
//         .pipe(
//             switchMap((response: HttpResponse<Object>) => {
//               const session: IStripeSession = response.body as IStripeSession;
//               return this.stripe.redirectToCheckout({ sessionId: session.id });
//             })
//         )
//         .subscribe(result => {
//           // If `redirectToCheckout` fails due to a browser or network
//           if (result.error) {
//             console.log(result.error)
//           }
//         });
//     this.subscriptions.add(checkout);
//   }
// }

// interface IStripeSession {
//   id: string;
// }

  //  //firsttry
  // paymentForm: FormGroup;

  // constructor(private fb: FormBuilder) {}

  // ngOnInit() {
  //   this.paymentForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     cardHolder: ['', Validators.required],
  //     cardNumber: ['', Validators.required],
  //     exp: ['', Validators.required],
  //     cvv: ['', Validators.required]
  //   });
  // }

  // ngAfterViewInit() {
  //   // Initialize PayPal Smart Payment Buttons
  //   paypal.Buttons({
  //     createOrder: (data, actions) => {
  //       // Replace 'YOUR_SERVER_URL' with your Laravel API endpoint
  //       return fetch('YOUR_SERVER_URL/api/create-paypal-order', {
  //         method: 'post',
  //         headers: {
  //           'content-type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           // Include your order details here
  //           amount: 100, // Example amount in cents
  //           currency: 'USD'
  //         })
  //       }).then(response => response.json()).then(order => order.id);
  //     },
  //     onApprove: (data, actions) => {
  //       // Handle the approved payment
  //       return fetch('YOUR_SERVER_URL/api/execute-paypal-order', {
  //         method: 'post',
  //         headers: {
  //           'content-type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           orderID: data.orderID
  //         })
  //       }).then(response => response.json()).then(details => {
  //         console.log(details); // Handle successful payment details
  //       });
  //     }
  //   }).render('#paypal-button-container');
  // }

  // Other methods for handling non-PayPal payments
// }
