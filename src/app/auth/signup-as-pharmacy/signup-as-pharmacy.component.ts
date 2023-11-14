import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pharmacies } from 'src/app/interface/pharmacies';
import pharmciesData from '../../../assets/json/pharmcies.json';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-signup-as-pharmacy',
  templateUrl: './signup-as-pharmacy.component.html',
  styleUrls: ['./signup-as-pharmacy.component.css'],
})
export class SignupAsPharmacyComponent {
  pharmacies: Pharmacies[] = pharmciesData;
  days: any;
  signupForm!: FormGroup;
  Swal!: SweetAlertIcon;
  daysArr: any = [];
  faCancel = faCancel;
  selectedDayId: number = 0;
  selectedDayName: string = '';
  selectedDays: { id: string; day: string }[] = [];
  notAllDataEntered: boolean = false;
  emailFail: boolean = false;
  passFail: boolean = false;
  governorates: any = [];
  cities: any = [];
  isCity: boolean = false;
  governorateID!: number | null;
  cityID!: number | null;
  imageFile: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.signupForm = new FormGroup({
      pharmaName: new FormControl('', [Validators.required]),
      pharmaEmail: new FormControl('', [Validators.required, Validators.email]),
      pharmaPhone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
      pharmaLicense: new FormControl('', [Validators.required]),
      pharmaCity: new FormControl('', [Validators.required]),
      pharmaGovern: new FormControl('', [Validators.required]),
      pharmaPass: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      pharmaStreet: new FormControl('', [Validators.required]),
      pharmaOpeningTime: new FormControl('', [Validators.required]),
      pharmaClosingTime: new FormControl('', [Validators.required]),
      pharmaBankAccount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9,18}$'),
      ]),
    });
  }

  ngOnInit() {
    this.getDays();
    this.getGovernorates();
    this.getAllPharmas();
  }

  allPharmacies!: any;
  emailAlreadyUsed = false;
  licenseAlreadyUsed = false;
  phoneAlreadyUsed = false;
  pharmaNameAlreadyUsed = false;
  bankAccountAlreadyUsed = false;

  onFileSelected(event: any): void {
    this.imageFile=event.target.files[0];
    console.log(this.imageFile)
  }

  getAllPharmas() {
    this.profileService.getAllPharmaciesInfo().subscribe((res: any) => {
      this.allPharmacies = res.data;
      console.log(this.allPharmacies);
    });
  }

  addPharma() {
    let pharmaName = this.signupForm.controls['pharmaName'].value;
    let pharmaEmail = this.signupForm.controls['pharmaEmail'].value;
    let pharmaStreet = this.signupForm.controls['pharmaStreet'].value;
    let pharmaLicense = this.signupForm.controls['pharmaLicense'].value;
    let pharmaCity = this.signupForm.controls['pharmaCity'].value;
    let pharmaGovern = this.signupForm.controls['pharmaGovern'].value;
    let pharmaOpeningTime = this.signupForm.controls['pharmaOpeningTime'].value;
    let pharmaClosingTime = this.signupForm.controls['pharmaClosingTime'].value;
    let pharmaBankAccount = this.signupForm.controls['pharmaBankAccount'].value;
    let pharmaPhone = this.signupForm.controls['pharmaPhone'].value;
    let pharmaPass = this.signupForm.controls['pharmaPass'].value;


    if (
      pharmaName &&
      pharmaGovern &&
      pharmaCity &&
      pharmaEmail &&
      pharmaBankAccount &&
      pharmaPhone &&
      pharmaLicense&&
      pharmaClosingTime&&
      pharmaOpeningTime&&
      pharmaStreet&&
      pharmaPass
    ) {

    const daysArrString = JSON.stringify(this.daysArr);
    const UserPhone = JSON.stringify(pharmaPhone);
    const userData = this.signupForm.value;

    const formData = new FormData();
    formData.append('userImage', this.imageFile);
    formData.append('pharmacyDayOff', daysArrString);
    formData.append('pharmaPhone', UserPhone);
    for (const key of Object.keys(userData)) {
      formData.append(key, userData[key]);
    }
    console.log('ok')
    this.http.post(`http://localhost:8000/api/pharmacies`, formData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response['token']);
        localStorage.setItem('role', response['role']);
        localStorage.setItem('user_id', response['user_id']);
        localStorage.setItem('_id', response['pharmacy_id']);
        localStorage.setItem('image', response['image']);
        window.location.href = `addProduct/${response['pharmacy_id']}`;
        console.log(response)
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'invaled data',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    );
      
    const foundEmail = this.allPharmacies.find(
      (obj: any) => obj.pharmacy_email === pharmaEmail
    );
    if (foundEmail) {
      this.emailAlreadyUsed = true;
    } else {
      let newPharma = {
        id:(this.pharmacies.length)+1,
        pharmacyName: pharmaName,
        email: pharmaEmail,
        licenseNum: pharmaLicense,
        password: pharmaPass,
      };
      this.emailAlreadyUsed = false;
    }

    const foundlicense = this.allPharmacies.find(
      (obj: any) => obj.licence_number === pharmaLicense
    );
    if (foundlicense) {
      this.licenseAlreadyUsed = true;
    } else {
      this.licenseAlreadyUsed = false;
    }

    const foundName = this.allPharmacies.find(
      (obj: any) => obj.pharmacy_name === pharmaName
    );
    if (foundName) {
      this.pharmaNameAlreadyUsed= true;
    } else {
      this.pharmaNameAlreadyUsed = false;
    }
    const foundAccount = this.allPharmacies.find(
      (obj: any) => obj.bank_account === (+pharmaBankAccount)
    );
    if (foundAccount) {
      this.bankAccountAlreadyUsed= true;
    } else {
      this.bankAccountAlreadyUsed = false;
    }

    if(!foundEmail && !foundlicense && !foundName && !foundAccount){
     }
  }else {
      this.notAllDataEntered = true;
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
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
