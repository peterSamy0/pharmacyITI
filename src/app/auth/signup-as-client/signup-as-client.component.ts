import { Component, ErrorHandler } from '@angular/core';
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
  errors:any ={};
  days: any;
  daysArr: any = [];
  selectedDays: { id: string; day: string }[] = [];
  imageFile:any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private profileService: ProfileService,
    private errorHandler : ErrorHandler
  ) {
    this.signupForm = new FormGroup({
     userEmail: new FormControl('', [
      Validators.required,
     Validators.email]),
      userPhone: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]{11}$')]),
      userFullName: new FormControl('', [Validators.required,
      Validators.pattern(/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/)]),
      userCity: new FormControl('', [Validators.required]),
      userGovern: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      userGender: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.getGovernorates();
    this.getClients();
    this.getDays();
  }

  onFileSelected(event:any){
    this.imageFile=event.target.files[0]
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

    console.log(this.signupForm)
    
    if (
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

      
      const foundEmail = this.allClients.find(
        (obj) => obj.client_email === userEmail
      );
      if (foundEmail) {
        console.log(`'${userEmail}' is used in our DataBase`);
        this.emailAlreadyUsed = true;
      } else {
        console.log(`'${userEmail}' is not used in our DataBase`);
        this.emailAlreadyUsed = false;
      }
      if(!foundEmail){

      const userData = this.signupForm.value;
      const formData = new FormData();
      formData.append('userImage', this.imageFile);
      for (const key of Object.keys(userData)) {
        formData.append(key, userData[key]);
      }
      this.http.post(`http://localhost:8000/api/clients`, formData).subscribe(
        (response:any) => {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('role', response['role']);
          localStorage.setItem('user_id', response['user_id']);
          localStorage.setItem('_id', response['_id']);
          localStorage.setItem('image', response['image']);
          window.location.href = '/';
        },

        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Check all fields',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      );
      
      }
    } else {
      this.notAllDataEntered = true;
      // this.profileService.errorAlert();
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
    this.profileService.selectedGov(val).subscribe(
      (response: any) => {
        this.cities = response.data;
      },
      (error) => console.log(error)
    );
  }

  selectedCity(val: any) {
    this.cityID = val;
  }

  //checking if email or phone number were already used and added in the db
  allClients!:Array<any>;
  emailAlreadyUsed =false;
  phoneAlreadyUsed = false;
  getClients(){
    this.profileService.getAllClients().subscribe((res:any)=>{
      this.allClients = res.map((obj:any) => obj.data);
    })
  }

  getDays() {
    this.http.get(`http://localhost:8000/api/days`).subscribe(
      (response) => {
        this.days = response;
      },
      (error) => console.log(error)
    );
  } 
  chooseDay(val: any) {
    const selectedDay = this.days.data.find((day: any) => day.id == val);
    const isExists = this.daysArr.includes(+val);
    if (!isExists && selectedDay) {
      this.selectedDays.push(selectedDay);
      this.daysArr.push(+val);
    }
  }
  removeDay(val: any) {
    this.selectedDays = this.selectedDays.filter((item) => item.id != val);
    this.daysArr = this.daysArr.filter((item: any) => item.id != val);
  }
}
