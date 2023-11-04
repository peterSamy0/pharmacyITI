import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData:any;
  constructor(private http: HttpClient){}
  ngOnInit(){
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user_id');
    this.http.get(`http://localhost:8000/api/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(
      data => {
        this.userData = data;
        console.log(this.userData)
      },
      error => {
        console.error('Error fetching user data: ', error);
      }
    );
  }
}
