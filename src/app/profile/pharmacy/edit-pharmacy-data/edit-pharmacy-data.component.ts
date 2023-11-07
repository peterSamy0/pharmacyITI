import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import pharmaciesData from '../../../../assets/json/pharmcies.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal, { SweetAlertIcon } from 'sweetalert2'


@Component({
  selector: 'app-edit-pharmacy-data',
  templateUrl: './edit-pharmacy-data.component.html',
  styleUrls: ['./edit-pharmacy-data.component.css']
})


export class EditPharmacyDataComponent {
  updatePharmaForm: FormGroup;
  pharmacies: Array<any> = pharmaciesData;
  emailFail: boolean = false;
  passFail: boolean = false;
  userFullNameFail: boolean = false;
  notAllDataEntered: boolean = false;
  Swal !:SweetAlertIcon;
  isCity : boolean = false;
  governorateID !: number;
  cities : any;
  governorates : any;
  cityID !: number;
  daysArr: any = [];
  days: any;
  selectedDayId: number = 0;
  selectedDayName: string = '';
  selectedDays: { id: string, day: string }[] = [];
  id :any;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.updatePharmaForm = new FormGroup({
      pharmaName: new FormControl('', [Validators.required]),
      pharmaPhone: new FormControl('', [Validators.required]),
      pharmaEmail: new FormControl('', [Validators.required]),
      pharmaPass: new FormControl('', [Validators.required]),
      pharmaLicense:  new FormControl('', [Validators.required]),
      pharmaBankAccount:  new FormControl('', [Validators.required]),
      pharmaOpeningTime:  new FormControl('', [Validators.required]),
      pharmaClosingTime:  new FormControl('', [Validators.required]),
      pharmaStreet:  new FormControl('', [Validators.required]),
      avaliableToDeliver: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id']
    this.getGovernorates();
    this.getDays()
  }

  pharmaId: any = this.pharmacies[this.activeRoute.snapshot.params['id'] - 1];
  update() {

    let pharmaName =this.updatePharmaForm.controls['pharmaName'].value;
    let pharmaEmail = this.updatePharmaForm.controls['pharmaEmail'].value;
    let pharmaPass = this.updatePharmaForm.controls['pharmaPass'].value;
    let pharmaStreet =this.updatePharmaForm.controls['pharmaStreet'].value;
    let pharmaLicense =this.updatePharmaForm.controls['pharmaLicense'].value;
    let pharmaBankAccount =this.updatePharmaForm.controls['pharmaBankAccount'].value;
    let pharmaPhone = this.updatePharmaForm.controls['pharmaPhone'].value;
    let pharmaOpeningTime = this.updatePharmaForm.controls['pharmaOpeningTime'].value;
    let pharmaClosingTime = this.updatePharmaForm.controls['pharmaClosingTime'].value;
    let availability =this.updatePharmaForm.controls['avaliableToDeliver'].value;
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

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

    console.log(body)

    
    if (!pharmaEmail.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
    } else if (!pharmaPass.match(passPattern)) {
      console.log('wrong password format');
      this.passFail = true;
    }  else if (
      pharmaEmail &&
      pharmaLicense&&
      pharmaPhone&&
      pharmaName &&
      // deliveryPass &&
      availability
    ) {
      let updatedData = {
        id: this.activeRoute.snapshot.params['id'],
        pharmacyName: pharmaName,
        password: pharmaPass,
        // city: pharmaCity,
        email:pharmaEmail,
        phone: pharmaPhone,
        licenseNum: pharmaLicense       
      
      };
      localStorage.setItem('updatedData', JSON.stringify(updatedData));
      this.passFail = false;
      this.emailFail = false;
      this.userFullNameFail = false;
      this.pharmaId = { ...this.pharmaId, ...updatedData };
      console.log(this.pharmaId, this.pharmacies, availability);
    } else {
      this.notAllDataEntered = true;
    }

    this.http.put(`http://localhost:8000/api/pharmacies/${this.id}`, body)
      .subscribe(
        response => {
          this.router.navigate(['/']);
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
          console.log(this.governorates)
        },
        error => console.log(error)
      )
  }
  selectedCity(val: any){
    this.cityID = val;
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
    this.selectedDays = this.selectedDays.filter( (item:any) => item.id != val)
    this.daysArr = this.daysArr.filter( (item:any) => item.id != val)
  }

}
