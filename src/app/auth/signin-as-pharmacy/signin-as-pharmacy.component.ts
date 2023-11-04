import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pharmacies } from 'src/app/interface/pharmacies';
import pharmciesData from  '../../../assets/json/pharmcies.json';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-signin-as-pharmacy',
  templateUrl: './signin-as-pharmacy.component.html',
  styleUrls: ['./signin-as-pharmacy.component.css']
})
export class SigninAsPharmacyComponent {

  pharmacies : Pharmacies[]= pharmciesData;
  tokenKey: any;
  Swal !:SweetAlertIcon;
  signinForm: FormGroup;

  constructor( private http: HttpClient, private router: Router) {
    this.signinForm = new FormGroup({
      pharmaEmail: new FormControl('', [Validators.required]),
      pharmaPass: new FormControl('',[Validators.required])
    });

    }
  checkPharma(){
    let pharmaEmail =this.signinForm.controls['pharmaEmail'].value;
     let pharmaPass =this.signinForm.controls['pharmaPass'].value;
    const body = {
      "email": pharmaEmail,
      "password":   pharmaPass     
    } 
    const token = localStorage.getItem('access_token');
    this.http.post(`http://localhost:8000/api/auth/login`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .subscribe(
        (response:any) => {
          const role = response['role'];
          if(role == 'pharmacy'){
            this.tokenKey = response['token']
            localStorage.setItem('token', this.tokenKey);
            localStorage.setItem('role', role);
            localStorage.setItem('user_id', response['user_id']);
            this.router.navigate(['/']);
          }else{
            Swal.fire({
              title: 'Error!',
              text: 'you are not a pharmacy',
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

}
