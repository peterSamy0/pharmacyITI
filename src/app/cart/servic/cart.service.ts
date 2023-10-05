import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount = this.cartItemCountSubject.asObservable();

  // Add an item to the cart
  addItemToCart(item: CartItem) {
    const existingItem = this.cartItems.find((cartItem: any) => cartItem.id === item.id);

    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, add it to the cart
      item.quantity = 1;
      this.cartItems.push(item);
    }

    // Update the cart item count
    this.cartItemCountSubject.next(this.cartItems.length);
  }

  // Remove an item from the cart
  removeItemFromCart(itemId: number) {
    const itemIndex = this.cartItems.findIndex((cartItem: any) => cartItem.id === itemId);

    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
    }

    // Update the cart item count
    this.cartItemCountSubject.next(this.cartItems.length);
  }

  // Update the quantity of an item in the cart
  updateCartItemQuantity(itemId: number, newQuantity: number) {
    const existingItem = this.cartItems.find((cartItem: any) => cartItem.id === itemId);

    if (existingItem) {
      existingItem.quantity = newQuantity;
    }

    // Update the cart item count
    this.cartItemCountSubject.next(this.cartItems.length);
  }

  // Get the cart items
  getCartItems() {
    return this.cartItems;
  }
}




export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string
}
