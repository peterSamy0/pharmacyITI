import { HttpBackend, HttpClient } from '@angular/common/http';
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
  counter:number = 0;
  userID!: number;
  faCartShopping = faCartShopping;
  constructor(
    private cartService: CartService , 
    private htttp: HttpClient, 
    private router: Router
    ){
    this.cartService.cartItemCount.subscribe(data => this.counter = data);
  };
  
  role: string | null = '';
  
  ngOnInit(){
    this.role = localStorage.getItem('role');
    console.log(this.role)
    this.userID = Number(localStorage.getItem('_id'));
  }
  
  logOut(){
    // this.htttp.post("", {}).subscribe(() => {
      // Remove token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_id');
      localStorage.removeItem('_id');
      // Redirect to the login page
      window.location.href = '/';
    // });
  }

  goToProfile(){
    console.log(this.role)
    if(this.role == 'pharmacy'){
      this.router.navigate([`pharmacy-profile/${this.userID}`])
    }else if(this.role == 'client'){
      this.router.navigate([`client-profile/${this.userID}`])
    }else if(this.role == 'delivery'){
      this.router.navigate([`delivery-profile/${this.userID}`])
    }
  }
}
