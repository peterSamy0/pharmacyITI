import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to changes in the cart count
    this.cartService.cartItemCount.subscribe((count) => {
      this.cartItemCount = count;
    });
  }
}
