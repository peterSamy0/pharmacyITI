import { Component } from '@angular/core';
import { CartService } from 'src/app/cart/servic/cart.service';
import { Router } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  counter: number = 0;
  userID!: number;
  faCartShopping = faCartShopping;
  userImage:any;
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  role: string | null = '';

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.userID = Number(localStorage.getItem('_id'));
    this.userImage = localStorage.getItem('image');
    this.counter = this.cartService.getCartItems();
    this.cartService.cartItemCount.subscribe(data => this.counter = data);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('_id');
    localStorage.removeItem('cart');
    window.location.href = '/';
  }

  goToProfile() {
    if (this.role == 'pharmacy') {
      this.router.navigate([`pharmacy-profile/${this.userID}`]);
    } else if (this.role == 'client') {
      this.router.navigate([`client-profile/${this.userID}`]);
    } else if (this.role == 'delivery') {
      this.router.navigate([`delivery-profile/${this.userID}`]);
    }
  }
  generateImageUrl() {
    if(this.userImage){
      return `http://localhost:8000/storage/${this.userImage}`;
    }
    return `assets/img/logoImg.png`;
  }
}