import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0; // Initialize the total price to 0

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Retrieve cart items from the CartService
    this.cartItems = this.cartService.getCartItems();

    // Calculate the total price when the component initializes
    this.calculateTotalPrice();
  }

  // Decrease the quantity of an item in the cart
  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateCartItemQuantity(item.id, item.quantity - 1);
      this.calculateTotalPrice(); // Recalculate the total price
    }
  }

  // Increase the quantity of an item in the cart
  increaseQuantity(item: CartItem) {
    this.cartService.updateCartItemQuantity(item.id, item.quantity + 1);
    this.calculateTotalPrice(); // Recalculate the total price
  }

  // Remove an item from the cart
  removeFromCart(item: CartItem) {
    this.cartService.removeItemFromCart(item.id);
    this.calculateTotalPrice(); // Recalculate the total price
  }

  // Calculate the total price of all items in the cart
  calculateTotalPrice() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
