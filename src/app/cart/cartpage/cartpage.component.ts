import { Component } from '@angular/core';
import { CartService } from '../servic/cart.service';
import { CartItem } from 'src/app/interface/CartItem';
import { ApiService } from '../servic/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent {
  cartItems: Array<any> = [];
  total: number = 0;
  clientId: Number = 3;
  pharmacyId: Number = 1;
  orderMedications: Array<object> = [];

  constructor(
    private cartService: CartService,
    private api: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateCartItemQuantity(item.id, item.quantity - 1);
      this.calculateTotalPrice();
    }
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateCartItemQuantity(item.id, item.quantity + 1);
    this.calculateTotalPrice();
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeItemFromCart(item.id);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.total = this.cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
  }

  pushMedication(mId: number, amount: number) {
    let obj = { "key": mId, "value": amount };
    this.orderMedications.push(obj);
  }

  submitOrder() {
    let data = {
      "client_id": this.clientId,
      "pharmacy_id": this.pharmacyId,
      "ordMedications": this.orderMedications
    };

    this.api.createResource(data).subscribe(Response => {
      console.log(Response);
    });
  }

  order() {
    this.orderMedications = [];

    this.cartItems.forEach((medication) => {
      let medId = medication.id;
      let amount = medication.quantity;
      let obj = { "key": medId, "value": amount };
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
    }}

  payWithPayPal() {
    const requestData = {
      amount: this.total
    };

    this.http.post<any>('http://localhost:8000/api/pay', requestData).subscribe(
      response => {
        window.location.href = response.redirect_url;
      },
      error => {
        console.error(error);
      }
    );
  }
}
