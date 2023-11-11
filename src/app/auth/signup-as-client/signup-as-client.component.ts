import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/interface/users';
import userData from '../../../assets/json/users.json';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-signup-as-client',
  templateUrl: './signup-as-client.component.html',
  styleUrls: ['./signup-as-client.component.css'],
})
export class SignupAsClientComponent {
  users: Users[] = userData;
  Swal!: SweetAlertIcon;
  signupForm: FormGroup;
  emailFail: boolean = false;
  passFail: boolean = false;
  userFullNameFail: boolean = false;
  notAllDataEntered: boolean = false;
  userGovernFail: boolean = false;
  isCity: boolean = false;
  governorateID!: number;
  cities: any;
  governorates: any;
  cityID!: number;
  constructor(
    private http: HttpClient,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required]),
      userPhone: new FormControl('', [Validators.required]),
      userFullName: new FormControl('', [Validators.required]),
      userCity: new FormControl('', [Validators.required]),
      userGovern: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required]),
      userGender: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    // console.log(this.activeRoute.snapshot.params['id']);

    // this.id = this.activeRoute.snapshot.params['id'];
    // this.getUserData();
    this.getGovernorates();

    // this.getCurrentGoverId();
  }

  addClient() {
    let userEmail = this.signupForm.controls['userEmail'].value;
    let userFullName = this.signupForm.controls['userFullName'].value;
    let userCity = this.signupForm.controls['userCity'].value;
    let userGovern = this.signupForm.controls['userGovern'].value;
    let userPhone = this.signupForm.controls['userPhone'].value;
    let userPass = this.signupForm.controls['userPass'].value;
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let fullNamePattern =
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const body = {
      user: {
        "name": userFullName,
        "email": userEmail,
        "password": userPass,
      },
      client: {
        "governorate_id": this.governorateID,
        "city_id": this.cityID,
      },
      phone: [userPhone]
    };
    if (!userFullName.match(fullNamePattern)) {
      console.log('wrong full name format');
      this.userFullNameFail = true;
    } else if (!userEmail.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
    } else if (!userPass.match(passPattern)) {
      console.log('wrong password format');
      this.passFail = true;
    } else if (!userGovern) {
      this.userGovernFail = true;
    } else if (
      userEmail &&
      userFullName &&
      userGovern &&
      userCity &&
      userPass
    ) {
      this.userFullNameFail = false;
      this.emailFail = false;
      this.passFail = false;
      this.userGovernFail = false;
      this.http.post(`http://localhost:8000/api/clients`, body).subscribe(
        (response:any) => {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('role', response['role']);
          localStorage.setItem('user_id', response['user_id']);
          localStorage.setItem('_id', response['_id']);
          window.location.href = '/';
        },

        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'invaled email or password',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      );
    } else {
      this.notAllDataEntered = true;
      this.profileService.errorAlert();
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
