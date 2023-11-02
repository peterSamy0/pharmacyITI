import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DeliveryResponse,
  DeliveryServiceService,
} from 'src/app/services/delivery-service.service';

@Component({
  selector: 'app-signup-as-delivery',
  templateUrl: './signup-as-delivery.component.html',
  styleUrls: ['./signup-as-delivery.component.css'],
})
export class SignupAsDeliveryComponent {
  newDeliveries!: DeliveryResponse[];
  signupForm: FormGroup;
  newDelivery!: any;
  emailFail: boolean = false;
  passFail: boolean = false;
  notAllDataEntered : boolean =false;
  emailErr!: string;
  passErr!: string;
  // id?: number;
  // name: string;
  // Governorate: string;
  // city: string;
  // email: string;
  // password: string;
  // national_ID: number;
  // available: number;
  // phones: number;
  constructor(
    private deliveryService: DeliveryServiceService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      governorate: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      national_ID: new FormControl('', [Validators.required]),
      // available: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  addDelivery() {
    console.log(this.signupForm);
    let name = this.signupForm.controls['name'].value;
    let governorate = this.signupForm.controls['governorate'].value;
    let city = this.signupForm.controls['city'].value;
    let email = this.signupForm.controls['email'].value;
    let national_ID = this.signupForm.controls['national_ID'].value;
    let phone = this.signupForm.controls['phone'].value;
    let pass = this.signupForm.controls['pass'].value;

    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!email.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
    } else if (!pass.match(passPattern)) {
      console.log('wrong password format');
      this.passFail = true;
    } else if (
      name &&
      governorate &&
      city &&
      email &&
      national_ID &&
      phone &&
      pass
    ) {
      this.newDelivery = {
        name: name,
        email: email,
        phone: phone,
        city: city,
        Governorate: governorate,
        national_ID: national_ID,
        password: pass.toString(),
        available: 1,
      };

      console.log(this.newDelivery);
      this.passFail = false;
      this.emailFail = false;
      this.deliveryService.saveDelivery(this.newDelivery).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
        },
        error: (err: any) => {
          console.log(err.error, 'errors');
        },
      });
    }else{
      this.notAllDataEntered = true;

    }
  }
}
