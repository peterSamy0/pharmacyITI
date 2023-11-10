// payment.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
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
}
