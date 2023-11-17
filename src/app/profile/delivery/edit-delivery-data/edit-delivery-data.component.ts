import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import deliveriesData from '../../../../assets/json/users.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-edit-delivery-data',
  templateUrl: './edit-delivery-data.component.html',
  styleUrls: ['./edit-delivery-data.component.css'],
})
export class EditDeliveryDataComponent {
  updateDeliveryForm: FormGroup;
  deliveries: Array<any> = deliveriesData;
  emailFail: boolean = false;
  passFail: boolean = false;
  userFullNameFail: boolean = false;
  notAllDataEntered: boolean = false;
  id!: number;
  deliveryId!: any;
  availableToDeliver!: boolean;
  Swal!: SweetAlertIcon;
  isCity: boolean = false;
  governorateID!: number;
  cities: any;
  governorates: any;
  cityID!: number;
  deliveryName!: any;
  deliveryEmail!: any;
  oldGov!: any;
  oldCity!: any;
  oldGovId!: number;
  oldCityId!: number;
  deliveryPhone!: any;
  oldPass:any;
  token: any;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private profileService: ProfileService,
    private http: HttpClient) {
    this.updateDeliveryForm = new FormGroup({
      deliveryFullName: new FormControl('', [Validators.required]),
      deliveryPhone: new FormControl('', [Validators.required]),
      deliveryEmail: new FormControl('', [Validators.required]),
      deliveryPass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getUserData();
    this.getGovernorates();
  }

  getUserData() {
    this.token = localStorage.getItem('token')
    this.profileService.getDelivery(this.id, this.token).subscribe(
      (res: any) => {
        this.deliveryId = res.data;
        console.log(res);
        this.deliveryName = this.deliveryId.name;
        this.deliveryEmail = this.deliveryId.email;
        this.oldGov = res.data.Governorate;
        this.oldCity = res.data.city;
        this.oldCityId = res.data.city_id;
        this.oldGovId = res.data.governorate_id;
        this.oldPass = res.data.password;
        if (this.deliveryId.available == 0) {
          this.availableToDeliver = false;
          console.log(this.availableToDeliver);
        } else {
          this.availableToDeliver = true;
        }
      },
      (error) => this.router.navigate(['not-found'])
    );
  }
  @ViewChild('myCheckbox')
  myCheckbox!: ElementRef;

  changeBtn() {
    const checkboxValue = this.myCheckbox.nativeElement.checked;
    if (checkboxValue == false) {
      this.deliveryId.available = 0;
    } else {
      this.deliveryId.available = 1;
    }
  }
  update() {
    let deliveryFullName =
    this.updateDeliveryForm.controls['deliveryFullName'].value;
    let deliveryEmail = this.updateDeliveryForm.controls['deliveryEmail'].value;
    let deliveryPhone = this.updateDeliveryForm.controls['deliveryPhone'].value;
    let deliveryPass = this.updateDeliveryForm.controls['deliveryPass'].value;

    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let fullNamePattern =
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const body = {
      user: {
        "name": deliveryFullName,
        "email": deliveryEmail,
        "password": deliveryPass || this.oldPass,
      },
      delivery: {
        "nationalID": this.deliveryId.national_ID,
        "governorateID": +this.governorateID || this.oldGovId,
        "cityID": this.cityID || this.oldCityId,
        "available":this.deliveryId.available
      },
    };
    console.log(body);
    if (!deliveryEmail.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
      this.profileService.errorAlert();
    }

    else if (
      deliveryEmail &&
      deliveryFullName
    ) {
      this.profileService.updateDelivery(this.id, body, this.token).subscribe(
        (response: any) => {
          this.router.navigate([`/delivery-profile/${this.id}`]);
        },
        (error) => {
          console.log(error);
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

  generateImageUrl(image: string) {
    return `http://localhost:8000/storage/${image}`;
  }
}
