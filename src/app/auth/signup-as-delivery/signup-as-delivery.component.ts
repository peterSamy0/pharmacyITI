import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/services/profile.service';
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
  phoneFail : boolean = false;
  nationalFail: boolean = false;
  notAllDataEntered : boolean =false;
  emailErr!: string;
  passErr!: string;
  userGovernFail: boolean = false;
  isCity: boolean = false;
  governorateID!: number;
  cities: any;
  governorates: any;
  cityID!: number;
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
    private router: Router,
    private profileService: ProfileService
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

  ngOnInit() {
    this.getGovernorates();

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
    let phonePattern = /\d{11}/;
    let nationalIdPattern = /\d{14}/;

    if (!email.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;

    }
    // else if (!phone.match(phonePattern)) {
    //   console.log('wrong phone format');
    //   this.phoneFail = true;
    // } 
    // else if (!national_ID.match(nationalIdPattern)) {
    //   console.log('wrong phone format');
    //   this.nationalFail = true;
    // } 
    else if (!pass.match(passPattern)) {
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
       "user":{
        "name":name,
        "email":email,
        "password": pass.toString()
        },
      "delivery":{
        "governorateID":this.governorateID,
        "cityID": this.cityID,
        "nationalID": national_ID,
        "available":1
       },
       "phone": [phone]
      };

      console.log(this.newDelivery);
      this.passFail = false;
      this.emailFail = false;
      this.phoneFail = false;
      this.nationalFail = false;
      this.deliveryService.saveDelivery(this.newDelivery).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('role', response['role']);
          localStorage.setItem('user_id', response['user_id']);
          localStorage.setItem('_id', response['delivery_id']);
          window.location.href = '/';
        },
        error: (err: any) => {
          console.log(err.error, 'errors');
        },
      });
    }else{
      this.notAllDataEntered = true;
    }
  }
  getGovernorates() {
    this.profileService.getGovernorates().subscribe(
      (response: any) => {
        this.governorates = response;
        console.log(this.governorates);
      },
      (error) => console.log(error)
    );
  }

  selectedGov(val: any) {
    this.isCity = true;
    this.governorateID = val;
    console.log(this.governorateID);
    this.profileService.selectedGov(val).subscribe(
      (response: any) => {
        this.cities = response.data;
      },
      (error) => console.log(error)
    );
  }

  selectedCity(val: any) {
    this.cityID = val;
    console.log(this.cityID);
  }
}
