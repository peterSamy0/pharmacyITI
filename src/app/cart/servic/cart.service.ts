import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/interface/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public pharmacyId!: number;
  public cartItems: any = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount = this.cartItemCountSubject.asObservable();
  x:number=0;


  constructor() {
    // Retrieve cart items from localStorage on service initialization
    // console.log(...this.cartItems,this.cartItems.length,typeof this.cartItems);
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartItemCountSubject.next(this.cartItems.length);
    }
    // console.log(...this.cartItems,this.cartItems.length,typeof this.cartItems);

  }

  addItemToCart(item: CartItem) {
    const existingItem = this.cartItems.find((cartItem: any) => cartItem.id == item.id);

    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, add it to the cart
      item.quantity = 1;
      this.cartItems.push(item);      
    }
    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    // Update the cart item count
    this.cartItemCountSubject.next(this.cartItems.length);
    
  }

  removeItemFromCart(itemId: number) {
    // console.log('Removing item from cart:', itemId);
    const itemIndex = this.cartItems.findIndex((cartItem: any) => cartItem.id === itemId);
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
      
      if(this.cartItems.length == 0) {
        this.pharmacyId = NaN;
      }
      // console.log(this.cartItems)
    }
    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    // Update the cart item count
    this.cartItemCountSubject.next(this.cartItems.length);
    // console.log('Cart after removing:', this.cartItems);
  }

  updateCartItemQuantity(itemId: number, newQuantity: number) {
    // console.log('Updating item quantity:', itemId, newQuantity);
    const existingItem = this.cartItems.find((cartItem: any) => cartItem.id === itemId);
    if (existingItem) {
      existingItem.quantity = newQuantity;
    }
    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemCountSubject.next(this.cartItems.length);
    // console.log('Cart after updating quantity:', this.cartItems);
  }

  // Get the cart items
  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    // console.log('Clearing cart');
    this.cartItems = [];
    this.cartItemCountSubject.next(0); // Update cart item count
    localStorage.removeItem('cart');
    // console.log('Cart after clearing:', this.cartItems);
  }

 
}
