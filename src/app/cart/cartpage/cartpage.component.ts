import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../servic/cart.service';
import { CartItem } from 'src/app/interface/CartItem';
import { ApiService } from '../servic/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})
export class CartpageComponent {
  cartItems: Array<any> = [];
  total: number = 0; // Initialize the total price to 0
  clientId!: Number;
  pharmacyId!: Number;
  dividedTotal: number = 0;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  // array of orderMedications:
  orderMedications: Array<object> = [];
  amount: any;
  payment: any;

  constructor(
    private cartService: CartService,
    private api: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
    console.log(this.cartService.cartItems);
    // get authorization data from local storage and service
    if (
      localStorage.getItem('role') &&
      localStorage.getItem('role') == 'client'
    ) {
      this.pharmacyId = this.cartService.pharmacyId;
      this.clientId = Number(localStorage.getItem('_id'));
      console.log(this.clientId);
    }

    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.dividedTotal.toFixed(2).toString(), // Assuming total is the correct amount
                  currency_code: 'EUR',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            // console.log(details);
            if (details.status === 'COMPLETED') {
              Swal.fire({
                icon: 'success',
                title: 'Your transaction is successful',
                text: 'Your transaction ID is: ' + details.id,
              });
        
              this.payment.transactionID = details.id;
              this.submitOrder();
              this.router.navigate(['home']);
            }
            // You can handle the successful payment here, e.g., call a function to submit the order
          });
        },
        onError: (error: any) => {
          console.log(error);
          // Handle errors, e.g., show an alert to the user
          Swal.fire({
            icon: 'error',
            title: 'Payment Error',
            text: 'There was an error processing your payment. Please try again.',
          });
        },
      })
      .render(this.paymentRef.nativeElement);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateCartItemQuantity(item.id, item.quantity - 1);
    } else {
      console.log('not working')
    }
    this.calculateTotalPrice();
  }
  

  increaseQuantity(item: CartItem) {
    this.cartService.updateCartItemQuantity(item.id, item.quantity + 1);
    this.calculateTotalPrice();
    this.calculateDividedTotal()
    
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeItemFromCart(item.id);
    this.calculateTotalPrice();
    this.calculateDividedTotal()
  }

  calculateTotalPrice() {
    this.total = this.cartItems.reduce(
      (acc: any, item: any) => acc + item.medicine_price * item.quantity,
      0
    );
    this.calculateDividedTotal()

  }
  calculateDividedTotal() {
    this.dividedTotal = this.total / 33;
  }

  pushMedication(mId: number, amount: number) {
    let obj = { key: mId, value: amount };
    this.orderMedications.push(obj);
  }

  submitOrder() {
    let data = {
      client_id: this.clientId,
      pharmacy_id: this.pharmacyId,
      ordMedications: this.orderMedications,
    };

    this.api.createResource(data).subscribe((Response) => {
      console.log(Response);
    });
  }

  order() {
    this.orderMedications = [];

    this.cartItems.forEach((medication) => {
      let medId = medication.id;
      let amount = medication.quantity;
      let obj = { key: medId, value: amount };
      this.orderMedications.push(obj);
    });

    if (this.cartItems.length > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Thanks for your purchase!',
        text: 'The order will be delivered soon.',
      }).then((result) => {
        if (result.isConfirmed) {
          this.submitOrder();
          this.cartService.clearCart();
          this.router.navigate(['/home']);
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Your cart is empty.',
        text: 'Add items before placing an order.',
      });
    }
  }

  // payWithPayPal() {
  //   const requestData = {
  //     amount: this.total,
  //   };

  //   this.http.post<any>('http://localhost:8000/api/pay', requestData).subscribe(
  //     (response) => {
  //       window.location.href = response.redirect_url;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
}
