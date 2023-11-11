import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/interface/users';
import userData from '../../../assets/json/users.json'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

// CommonJS
@Component({
  selector: 'app-signin-as-client',
  templateUrl: './signin-as-client.component.html',
  styleUrls: ['./signin-as-client.component.css'],
})
export class SigninAsClientComponent {

  pharmacyId!: any;
  users: Users[] = userData;
  private tokenKey = 'access_token';
  Swal !: SweetAlertIcon;
  userNotFound: boolean = false;
  signinForm: FormGroup;
  constructor(private http: HttpClient, private router: Router) {
    this.signinForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required])
    });

  }

  checkUser() {
    let userEmail = this.signinForm.controls['userEmail'].value;
    let userPass = this.signinForm.controls['userPass'].value;
    const body = {
      "email": userEmail,
      "password": userPass
    }

    this.http.post(`http://localhost:8000/api/auth/login`, body)
      .subscribe(
        (response: any) => {
          const role = response['role'];
          console.log(response)
          if (role) {
            localStorage.setItem('token', response['token']);
            localStorage.setItem('user_id', response['user_id']);
            localStorage.setItem('role', response['role']);
            localStorage.setItem('_id', response['_id']);
            window.location.href = '/';
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'you are not a user',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        },

        error => {
          console.log(error)
          Swal.fire({
            title: 'Error!',
            text: 'invaled email or password',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      );
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove the token from localStorage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

}





