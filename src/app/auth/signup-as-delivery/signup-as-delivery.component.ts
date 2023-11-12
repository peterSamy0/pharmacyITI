import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/services/profile.service';
import {
  DeliveryResponse,
  DeliveryServiceService,
} from 'src/app/services/delivery-service.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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
  phoneFail: boolean = false;
  nationalFail: boolean = false;
  notAllDataEntered: boolean = false;
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
      name: new FormControl('', [Validators.required,
        Validators.pattern(/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/)]),
      governorate: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      national_ID: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{14}$'),
      ]),
      // available: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
    });
  }

  ngOnInit() {
    this.getGovernorates();
    this.getallDeliveriesData();
  }

  allDeliveries!: any;
  emailAlreadyUsed = false;
  nationalIdAlreadyUsed = false;
  phoneAlreadyUsed = false;
  getallDeliveriesData() {
    this.profileService.getAllDeliveriesInfo().subscribe((res: any) => {
      this.allDeliveries = res.data;
      console.log(this.allDeliveries);
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

    // let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // let phonePattern = /\d{11}/;
    // let nationalIdPattern = /\d{14}/;

    // if (!email.match(emailPattern)) {
    //   console.log('invalid email format');
    //   this.emailFail = true;
    // }
    // else if (!phone.match(phonePattern)) {
    //   console.log('wrong phone format');
    //   this.phoneFail = true;
    // }
    // else if (!national_ID.match(nationalIdPattern)) {
    //   console.log('wrong phone format');
    //   this.nationalFail = true;
    // }
    // else if (!pass.match(passPattern)) {
    //   console.log('wrong password format');
    //   this.passFail = true;
    // } else
    if (name && governorate && city && email && national_ID && phone && pass) {
      this.newDelivery = {
        user: {
          name: name,
          email: email,
          password: pass.toString(),
        },
        delivery: {
          governorateID: this.governorateID,
          cityID: this.cityID,
          nationalID: +national_ID,
          available: 1,
        },
       phone: [phone]
      };

      console.log(this.newDelivery);
      this.passFail = false;
      this.emailFail = false;
      this.phoneFail = false;
      this.nationalFail = false;

      const foundEmail = this.allDeliveries.find(
        (obj: any) => obj.email === email
      );
      if (foundEmail) {
        console.log(`'${email}' is used in our DataBase`);
        this.emailAlreadyUsed = true;
        // nationalIdAlreadyUsed= false;
        // phoneAlreadyUsed =false;
      } else {
        console.log(`'${email}' is not used in our DataBase`);
        this.emailAlreadyUsed = false;
      }

      const foundNationalId = this.allDeliveries.find(
        (obj: any) => obj.national_ID === (+national_ID)
      );
      if (foundNationalId) {
        console.log(`'${national_ID}' is used in our DataBase`);
        this.nationalIdAlreadyUsed = true;
      } else {
        console.log(`'${national_ID}' is not used in our DataBase`);
        this.nationalIdAlreadyUsed = false;
      }

      if (!foundEmail && !foundNationalId) {
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
            Swal.fire({
              title: 'Error!',
              text: 'Check all fields',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          },
        });
      }
    } else {
      this.notAllDataEntered = true;
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
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
