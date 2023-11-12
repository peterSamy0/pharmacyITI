import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/interface/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public pharmacyId!:number;
  public cartItems: any = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount = this.cartItemCountSubject.asObservable();

 
  addItemToCart(item: CartItem) {
    const existingItem = this.cartItems.find((cartItem: any) => cartItem.medicine_id === item.id);
    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, add it to the cart
      item.quantity = 1;
      this.cartItems.push(item);
    }
    // Update the cart in the session
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    // Update the cart item count
    this.cartItemCountSubject.next(this.cartItems.length);
  }
  
  removeItemFromCart(itemId: number) {
    const itemIndex = this.cartItems.findIndex((cartItem: any) => cartItem.id === itemId);
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    // Update the cart in the session
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  
    // Update the cart item count
    this.cartItemCountSubject.next(this.cartItems.length);
  }


  updateCartItemQuantity(itemId: number, newQuantity: number) {
    const existingItem = this.cartItems.find((cartItem: any) => cartItem.id === itemId);
    if (existingItem) {
      existingItem.quantity = newQuantity;
    }
    // Update the cart in the session
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemCountSubject.next(this.cartItems.length);
  }

  // Get the cart items
  getCartItems() {
    const getitems = sessionStorage.getItem('cart')
    if(getitems){
      return JSON.parse(getitems);
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemCountSubject.next(0); // Update cart item count
    sessionStorage.removeItem('cart');
  }
  
}




