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

  selectedFile !:File;

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0]
    console.log(this.selectedFile)
  }
  onUpload(){
    const uploadData = new FormData;
    uploadData.append('images', this.selectedFile, this.selectedFile.name)
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
    // if (!userFullName.match(fullNamePattern)) {
    //   console.log('wrong full name format');
    //   this.userFullNameFail = true;
    // } else if (!userEmail.match(emailPattern)) {
    //   console.log('invalid email format');
    //   this.emailFail = true;
    // } else if (!userPass.match(passPattern)) {
    //   console.log('wrong password format');
    //   this.passFail = true;
    // } else if (!userGovern) {
    //   this.userGovernFail = true;
    // } else 
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

      // for( let i = 0 ; i <= this.allClients.length ; i ++){
      //   if(this.allClients[i]['client_email'] == userEmail){
      //     this.emailAlreadyUsed = true;
      //     console.log("email already used")
      //   }
      // }

      // const alreadyExist = this.allClients.filter(function (e){
      //   return e.client_email = userEmail 
      // })
      
      const foundEmail = this.allClients.find(
        (obj) => obj.client_email === userEmail
      );
      if (foundEmail) {
        console.log(`'${userEmail}' is used in our DataBase`);
        this.emailAlreadyUsed = true;
        // nationalIdAlreadyUsed= false;
        // phoneAlreadyUsed =false;
      } else {
        console.log(`'${userEmail}' is not used in our DataBase`);
        this.emailAlreadyUsed = false;
      }
      if(!foundEmail){

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

  //checking if email or phone number were already used and added in the db
  allClients!:Array<any>;
  emailAlreadyUsed =false;
  phoneAlreadyUsed = false;
  getClients(){
    this.profileService.getAllClients().subscribe((res:any)=>{
      this.allClients = res.map((obj:any) => obj.data);
      console.log(this.allClients)
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
