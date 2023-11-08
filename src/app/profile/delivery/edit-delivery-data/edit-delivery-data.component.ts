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
  deliveryId!:any;
  availableToDeliver !: boolean;
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
  constructor(private activeRoute: ActivatedRoute, private router: Router, private profileService: ProfileService,
    private http: HttpClient) {
    this.updateDeliveryForm = new FormGroup({
      deliveryFullName: new FormControl('', [Validators.required]),
      // deliveryUserName: new FormControl('', [Validators.required]),
      deliveryPhone: new FormControl('', [Validators.required]),
      deliveryEmail: new FormControl('', [Validators.required]),
      // deliveryCity: new FormControl('', [Validators.required]),
      // deliveryGovern: new FormControl('', [Validators.required]),
      deliveryPass: new FormControl('', [Validators.required]),
      // avaliableToDeliver: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log(this.activeRoute.snapshot.params['id']);
    this.id = this.activeRoute.snapshot.params['id'];
   this.getUserData();
   this.getGovernorates();

  }
  

  getUserData() {
    this.profileService.getDelivery(this.id).subscribe(
      (res: any) => {
        this.deliveryId = res.data;
        console.log(this.deliveryId);
        this.deliveryName = this.deliveryId.name;
        this.deliveryEmail = this.deliveryId.email;
        this.oldGov = res.data.Governorate;
        this.oldCity = res.data.city;
        if (this.deliveryId.available== 0){
          this.availableToDeliver = false;
          console.log(this.availableToDeliver)
         }else{
          this.availableToDeliver = true;
         }
      },
      (error) => console.log(error)
    );
  }
  @ViewChild("myCheckbox")
  myCheckbox!: ElementRef;

    changeBtn() {
        const checkboxValue = this.myCheckbox.nativeElement.checked;
        console.log('Checkbox value:', checkboxValue);
        if(checkboxValue == false){
          this.deliveryId.available= 0;
          console.log( this.deliveryId.available)
        }
        else{
          this.deliveryId.available= 1;
          console.log( this.deliveryId.available)
        }
    }
  update() {
    console.log(this.updateDeliveryForm.value);
    let deliveryFullName =this.updateDeliveryForm.controls['deliveryFullName'].value;
    let deliveryEmail = this.updateDeliveryForm.controls['deliveryEmail'].value;
    // let deliveryUserName =this.updateDeliveryForm.controls['deliveryUserName'].value;
    let deliveryPhone = this.updateDeliveryForm.controls['deliveryPhone'].value;
    // let deliveryCity = this.updateDeliveryForm.controls['deliveryCity'].value;
    let deliveryPass = this.updateDeliveryForm.controls['deliveryPass'].value;
    // let deliveryGovern = this.updateDeliveryForm.controls['deliveryGovern'].value;
    // let availability =this.updateDeliveryForm.controls['avaliableToDeliver'].value;

    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let fullNamePattern =
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const body = {
      user: {
        name: deliveryFullName,
        email: deliveryEmail,
        password: deliveryPass || this.deliveryId.password || 324234,
      },
      delivery: {
        nationalID: this.deliveryId.national_ID,
        governorateID: +this.governorateID || this.oldGovId,
        cityID: this.cityID || this.oldCityId,
        available:this.deliveryId.available
      },
    };
    console.log(body)
    if (!deliveryEmail.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
      this.profileService.errorAlert();
    }
    //  else if (!clientPass.match(passPattern)) {
    //   console.log('wrong password format');
    //   this.passFail = true;
    //   this.profileService.errorAlert()
    // }
    else if (
      deliveryEmail &&
      // deliveryPass&&
      // deliveryPhone&&
      deliveryFullName
    ) {
      this.profileService.updateDelivery(this.id, body).subscribe(
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
        this.oldGovId = this.governorates.find(
          (obj: any) => obj['governorate_name'] === this.oldGov
        ).governorate_id;
        this.oldCityId = this.governorates
          .find((obj: any) => obj['governorate_name'] === this.oldGov)
          .cities.find(
            (city: any) => city['city_name'] == this.oldCity
          ).city_id;
        console.log(this.oldCityId, this.oldGovId);
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
}
