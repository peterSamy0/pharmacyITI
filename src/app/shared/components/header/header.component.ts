import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CartService } from 'src/app/cart/servic/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  counter:number = 0;
  constructor(private cartService: CartService , private htttp: HttpClient, private router: Router){
    this.cartService.cartItemCount.subscribe(data => this.counter = data);
  };
  
  role: string | null = '';

  logOut(){
    // this.htttp.post("", {}).subscribe(() => {
      // Remove token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_id');
      // Redirect to the login page
      this.router.navigate(['/login']);
    // });
  }

  ngOnInit(){
    this.role = localStorage.getItem('role');
  }
}
