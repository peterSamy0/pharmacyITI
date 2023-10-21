import { Component } from '@angular/core';
import { CartService } from 'src/app/cart/servic/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  counter:number = 0;
  constructor(private cartService: CartService){
    this.cartService.cartItemCount.subscribe(data => this.counter = data);
  };
  
}
