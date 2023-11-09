import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pharmacies } from 'src/app/interface/pharmacies';
import pharmciesData from '../../../assets/json/pharmcies.json';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-signin-as-pharmacy',
  templateUrl: './signin-as-pharmacy.component.html',
  styleUrls: ['./signin-as-pharmacy.component.css'],
})
export class SigninAsPharmacyComponent {

  pharmacies : Pharmacies[]= pharmciesData;
  tokenKey: any;
  Swal !:SweetAlertIcon;
  signinForm: FormGroup;
  pharmaNotFound = false;

  constructor( private http: HttpClient, private router: Router, private route: ActivatedRoute) {

  signinForm: FormGroup;
    this.signinForm = new FormGroup({
      pharmaEmail: new FormControl('', [Validators.required]),
      pharmaPass: new FormControl('', [Validators.required]),
    });
  }


  checkPharma(){
    let pharmaEmail =this.signinForm.controls['pharmaEmail'].value;
    let pharmaPass =this.signinForm.controls['pharmaPass'].value;
    const credentials = {
      "email": pharmaEmail,
      "password": pharmaPass     
    } 
    this.http.post(`http://localhost:8000/api/auth/login`, credentials)
      .subscribe(

        (response:any) => {
            this.tokenKey = response['token']
            localStorage.setItem('token', this.tokenKey);
            localStorage.setItem('role', response['user_id']);
            localStorage.setItem('user_id', response['user_id']);
            localStorage.setItem('pharmacy_id', response['pharmacy_id']);
            // this.router.navigate(['/']);
            window.location.href = '/';
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
}

