import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  role: string | null = '';
  constructor (private htttp: HttpClient, private router: Router){}
  logOut(){
    console.log('hello')
    this.htttp.post("", {}).subscribe(() => {
      // Remove token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_id');
      // Redirect to the login page
      this.router.navigate(['/login']);
    });
  }

  ngOnInit(){
    this.role = localStorage.getItem('role');
  }
}
