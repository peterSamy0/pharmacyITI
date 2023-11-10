import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import {
  DeliveryResponse,
  DeliveryServiceService,
} from 'src/app/services/delivery-service.service';

@Component({
  selector: 'app-signin-as-delivery',
  templateUrl: './signin-as-delivery.component.html',
  styleUrls: ['./signin-as-delivery.component.css'],
})
export class SigninAsDeliveryComponent {
  deliveries!: DeliveryResponse[];
  deliveryNotFound = false;
  
  signinForm: FormGroup;
  constructor(
    private router: Router,
    private deliveryService: DeliveryServiceService,
    private http: HttpClient
  ) {
    this.signinForm = new FormGroup({
      deliveryEmail: new FormControl('', [Validators.required]),
      deliveryPass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getDeliveryLists();
  }
  getDeliveryLists() {
    this.deliveryService.getDelivery().subscribe((res: any) => {
      console.log(res.data);
      this.deliveries = res.data;
      console.log(this.deliveries);
    });
  }


  checkDelivery() {
    let deliveryEmail = this.signinForm.controls['deliveryEmail'].value;
    let deliveryPass = this.signinForm.controls['deliveryPass'].value;
    const body = {
      "email": deliveryEmail,
      "password": deliveryPass
    }

    this.http.post(`http://localhost:8000/api/auth/login`, body)
      .subscribe(
        (response: any) => {
          const role = response['role'];
          if (role == 'client') {
            console.log(response)
            localStorage.setItem('token', response['token']);
            localStorage.setItem('user_id', response['user_id']);
            localStorage.setItem('role', response['role']);
            localStorage.setItem('_id', response['_id']);
            window.location.href = '/';
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'you are not a client',
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
