import { Component } from '@angular/core';
import { CartService } from '../servic/cart.service';
import { CartItem } from 'src/app/interface/CartItem';
import { ApiService } from '../servic/api.service';
import { Router } from '@angular/router'; // Import the Router module


@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent {
  cartItems: Array<any> = [];
  total: number = 0; // Initialize the total price to 0
  clientId: Number = 3;
  pharmacyId: Number = 1;
  // array of orderMedications:
  orderMedications: Array<object> = [];

  constructor(private cartService: CartService, private api:ApiService,private router: Router) {}

  ngOnInit(): void {
    // Retrieve cart items from the CartService
    this.cartItems = this.cartService.getCartItems();
    // Calculate the total price when the component initializes
    this.calculateTotalPrice();
    console.log(this.cartService.cartItems) 
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
    this.total = this.cartItems.reduce((acc:any, item:any) => acc + item.price * item.quantity, 0);
  }

  // back end logic
  pushMedication(mId:number, amount:number){
    let obj = {"key":mId, "value":amount}
    this.orderMedications.push(obj);
  }

  submitOrder(){
    let data = {       
      "client_id": this.clientId,
      "pharmacy_id": this.pharmacyId,
      "ordMedications": this.orderMedications
  }
  console.log(JSON.stringify(data));
    this.api.createResource(data).subscribe(Response=>{
      console.log(Response);
      
    })
    
  }
  order(){
    this.cartItems.forEach((medication)=>{
      let medId = medication.id;
      let amount = medication.quantity;
      let obj = {"key": medId, "value": amount};
      this.orderMedications.push(obj);
      
    })
    alert('Thanks for your purchase! The order will be delivered soon.');
    this.router.navigate(['/home']); // Redirect to the home page
    this.submitOrder();
  }
  payWithCard() {
    // Redirect to the payment page
    this.router.navigate(['/payment']);
  }


}

