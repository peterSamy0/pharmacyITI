import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Users } from 'src/app/interface/users';
import userData from '../../../assets/json/users.json'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2'

// CommonJS
@Component({
  selector: 'app-signin-as-client',
  templateUrl: './signin-as-client.component.html',
  styleUrls: ['./signin-as-client.component.css'],
})
export class SigninAsClientComponent {


  users : Users[]= userData;

  Swal !:SweetAlertIcon;

  signinForm: FormGroup;
  constructor(private http: HttpClient, private router: Router) {
    this.signinForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      userPass: new FormControl('',[Validators.required])
    });

    }

    checkUser(){
      let userEmail =this.signinForm.controls['userEmail'].value;
      let userPass =this.signinForm.controls['userPass'].value;
      const body = {
        "email": userEmail,
        "password":   userPass     
      } 

      this.http.post(`http://localhost:8000/api/auth/login`, body)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/']);
          },
  
          error => {
            console.log(error)
            Swal.fire({
              title: 'Error!',
              text: 'invaled email or password',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        );
    }

   
  }

 



