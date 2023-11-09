import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pharmacies } from 'src/app/interface/pharmacies';
import pharmciesData from '../../../assets/json/pharmcies.json';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { faCancel } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-signup-as-pharmacy',
  templateUrl: './signup-as-pharmacy.component.html',
  styleUrls: ['./signup-as-pharmacy.component.css'],
})

export class SignupAsPharmacyComponent {
  pharmacies: Pharmacies[] = pharmciesData;
  days: any;
  signupForm!: FormGroup;
  Swal !:SweetAlertIcon;
  daysArr: any = [];
  faCancel = faCancel;
  selectedDayId: number = 0;
  selectedDayName: string = '';
  selectedDays: { id: string, day: string }[] = [];
  notAllDataEntered: boolean = false;
  emailFail: boolean = false;
  passFail: boolean = false;
  governorates : any = [];
  cities : any = [];
  isCity:boolean = false;
  governorateID!: number| null;
  cityID!: number| null;
  constructor(private http: HttpClient, private router: Router) {

    this.signupForm = new FormGroup({
      pharmaName: new FormControl('', [Validators.required]),
      pharmaEmail: new FormControl('', [Validators.required]),
      pharmaPhone: new FormControl('', [Validators.required]),
      pharmaLicense: new FormControl('', [Validators.required]),
      pharmaCity: new FormControl('', [Validators.required]),
      pharmaGovern: new FormControl('', [Validators.required]),
      pharmaPass: new FormControl('', [Validators.required]),
      pharmaStreet :new FormControl('', [Validators.required]),
      pharmaOpeningTime :new FormControl('', [Validators.required]),
      pharmaClosingTime :new FormControl('', [Validators.required]),
      pharmaBankAccount :new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(){
    this.getDays();
    this.getGovernorates();
  }

  addPharma() {
    let pharmaName = this.signupForm.controls['pharmaName'].value;
    let pharmaEmail = this.signupForm.controls['pharmaEmail'].value;
    let pharmaStreet = this.signupForm.controls['pharmaStreet'].value;
    let pharmaLicense = this.signupForm.controls['pharmaLicense'].value;
    // let pharmaCity = this.signupForm.controls['pharmaCity'].value;
    // let pharmaGovern = this.signupForm.controls['pharmaGovern'].value;
    let pharmaOpeningTime = this.signupForm.controls['pharmaOpeningTime'].value;
    let pharmaClosingTime = this.signupForm.controls['pharmaClosingTime'].value;
    let pharmaBankAccount = this.signupForm.controls['pharmaBankAccount'].value;
    let pharmaPass = this.signupForm.controls['pharmaPass'].value;
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!pharmaEmail.match(emailPattern)) {
        console.log('invalid email format');
      } else if (!pharmaPass.match(passPattern)) {
        console.log('wrong password format');
      } else {
        let newPharma = {
          id:(this.pharmacies.length)+1,
          pharmacyName: pharmaName,
          email: pharmaEmail,
          // phone: pharmaPhone,
          // city: pharmaCity,
          // governorate: pharmaGovern,
          licenseNum: pharmaLicense,
          password: pharmaPass,
        };
      }
    const body = {
      "user" : {
        "name" : pharmaName,
        "email": pharmaEmail,
        "password": pharmaPass     
      },
      "pharmacy" : {
        "image" : "test.png",
        "licence_number": pharmaLicense,
        "opening": pharmaOpeningTime,
        "closing": pharmaClosingTime,
        "street": pharmaStreet,
        "bank_account": +pharmaBankAccount || null,
        "governorate_id" : this.governorateID,
        "city_id" : this.cityID
      },
      "daysOff": this.daysArr

    }

        
    this.http.post(`http://localhost:8000/api/pharmacies`, body)
      .subscribe(
        (response:any) => {
            localStorage.setItem('token', response['token']);
            localStorage.setItem('role', response['role']);
            localStorage.setItem('user_id', response['user_id']);
            localStorage.setItem('pharmacy_id', response['pharmacy_id']);

          this.router.navigate([`addProduct/${response['pharmacy_id']}`]);
        },
        error => {
          console.log(error)
          Swal.fire({
            title: 'Error!',
            text: 'invaled data',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    });
  }

  getDays(){
    this.http.get(`http://localhost:8000/api/days`)
      .subscribe(
        response => {
          this.days = response
        },
        error => console.log(error)
      )
  }

  chooseDay(val:any){
    const selectedDay = this.days.data.find((day: any) => day.id == val);
    const isExists = this.daysArr.includes(+val);
    if(!isExists && selectedDay){
      this.selectedDays.push(selectedDay);
      this.daysArr.push(+val);
    }
  }
  removeDay(val:any){
    this.selectedDays = this.selectedDays.filter( (item) => item.id != val)
    this.daysArr = this.daysArr.filter( (item:any) => item.id != val)
  }
  
  selectedGov(val: any){
    this.isCity = true
    this.governorateID = val;
    this.http.get(`http://localhost:8000/api/governorates/${val}`)
      .subscribe(
        response => {
          this.cities = response;
        },
        error => console.log(error)
      )
  }

  getGovernorates(){
    this.http.get(`http://localhost:8000/api/governorates`)
      .subscribe(
        response => {
          this.governorates = response;
        },
        error => console.log(error)
      )
  }
  selectedCity(val: any){
    this.cityID = val;
  }
}

