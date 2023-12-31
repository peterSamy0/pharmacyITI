import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import pharmaciesData from '../../../../assets/json/pharmcies.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { UrlService } from 'src/app/services/url.service';


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
  isCity : boolean = false;
  governorateID !: number;
  cities : any;
  governorates : any;
  cityID !: number;
  daysArr: any = [];
  phones: any = [];
  days: any;
  selectedDayId: number = 0;
  selectedDayName: string = '';
  selectedDays: { id: string, day: string }[] = [];
  id :any;
  userDate: any;
  loadingDate: boolean = false;
  oldGov!: string; // Define the variable to store the old value 
  oldCity!: string; // Define the variable to store the old value 
  gov!: string; // Current selected value
  token: any;
  isLoading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute, 
    private service: ProfileService, 
    private router:Router,
    private urlService: UrlService
    ) {
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
    });
  }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id']
    this.getUserData();
    this.getGovernorates();
    this.getDays();
  }

  pharmaId: any = this.pharmacies[this.activeRoute.snapshot.params['id'] - 1];

  getUserData(){
    this.isLoading = true;
    this.token = localStorage.getItem('token')
    this.urlService.getPharmacy(this.id, this.token).subscribe(
      (res: any) => {
        this.userDate = res.data;
        this.oldGov = res.data.Governorate
        this.oldCity = res.data.city
        this.loadingDate = true;
        this.isLoading = false;
      },
      error => this.router.navigate(['not-found'])
    )
  }

  // function to update pharamcy data and form validation 
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
    // let availability =this.updatePharmaForm.controls['avaliableToDeliver'].value;
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const body = {
      "user" : {
        "name" : pharmaName,
        "email": pharmaEmail,
        "password": pharmaPass || this.userDate.password,
        "phone" : pharmaPhone 
      },
      "pharmacy" : {
        
        "licence_number": pharmaLicense,
        "opening": pharmaOpeningTime,
        "closing": pharmaClosingTime,
        "street": pharmaStreet,
        "bank_account": +pharmaBankAccount || null,
        "governorate_id" : +this.governorateID ||this.userDate.governorate_id,
        "city_id" : this.cityID || this.userDate.city_id
      },
      "daysOff": this.daysArr
    }

    if (!pharmaEmail.match(emailPattern)) {
      this.emailFail = true;
      this.service.errorAlert();
    } else if (
      pharmaEmail &&
      pharmaLicense&&
      pharmaName
    ) {
      this.urlService.updatePharmacyData(body, this.id, this.token).subscribe(
        (response:any)  => {
          this.router.navigate([`/pharmacy-profile/${this.id}`]);
        },
        error => {
          this.router.navigate(['not-found'])
        }
      )
    } else {
      this.notAllDataEntered = true;
      this.service.errorAlert()
    }
  }
  
  // get governorates
  getGovernorates(){
    this.urlService.getGovernorates().subscribe(
      (response:any) => {
        this.governorates = response;
      },
      error => console.log(error)
    )
  }

  // get cities of selected governorate
  selectedGov(val: any){
    this.isCity = true
    this.governorateID = val;
    this.urlService.selectedGov(val)
      .subscribe(
        (response:any) => {
          this.cities = response.data;
        },
        error => console.log(error)
      )
  }

  // get id of selected city
  selectedCity(val: any){
    this.cityID = val;
  }

  // get name of days 
  getDays(){
    this.urlService.getDays()
      .subscribe(
        (response:any) => {
          this.days = response
        },
        error => console.log(error)
      )
  }

  // get id of selected day
  chooseDay(val:any){
    const selectedDay = this.days.data.find((day: any) => day.id == val);
    const isExists = this.daysArr.includes(+val);
    if(!isExists && selectedDay){
      this.selectedDays.push(selectedDay);
      this.daysArr.push(+val);
    }
  }

  // remove selected city if user want
  removeDay(val:any){
    this.selectedDays = this.selectedDays.filter( (item:any) => item.id != val)
    this.daysArr = this.daysArr.filter( (item:any) => item.id != val)
  }

  // get pharamcy phone number if exists
  getPhone(num:any){
      this.phones.push(num)
  }

  // get image from back end
  generateImageUrl(image: string) {
    return `http://localhost:8000/storage/${image}`;
  }

}
