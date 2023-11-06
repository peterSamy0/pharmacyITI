import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import pharmaciesData from '../../../../assets/json/pharmcies.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    this.updatePharmaForm = new FormGroup({
      pharmaName: new FormControl('', [Validators.required]),
      pharmaPhone: new FormControl('', [Validators.required]),
      pharmaEmail: new FormControl('', [Validators.required]),
      pharmaCity: new FormControl('', [Validators.required]),
      pharmaGovern: new FormControl('', [Validators.required]),
      pharmaPass: new FormControl('', [Validators.required]),
      pharmaLicense:  new FormControl('', [Validators.required]),
      avaliableToDeliver: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log(this.activeRoute.snapshot.params['id']);
  }

  pharmaId: any = this.pharmacies[this.activeRoute.snapshot.params['id'] - 1];
  update() {
    console.log(this.updatePharmaForm.value);
    let pharmaName =this.updatePharmaForm.controls['pharmaName'].value;
    let pharmaEmail = this.updatePharmaForm.controls['pharmaEmail'].value;
    let pharmaLicense =this.updatePharmaForm.controls['pharmaLicense'].value;
    let pharmaPhone = this.updatePharmaForm.controls['pharmaPhone'].value;
    let pharmaCity = this.updatePharmaForm.controls['pharmaCity'].value;
    let pharmaPass = this.updatePharmaForm.controls['pharmaPass'].value;
    let pharmaGovern = this.updatePharmaForm.controls['pharmaGovern'].value;
    let availability =this.updatePharmaForm.controls['avaliableToDeliver'].value;

    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!pharmaEmail.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
    } else if (!pharmaPass.match(passPattern)) {
      console.log('wrong password format');
      this.passFail = true;
    }  else if (
      pharmaEmail &&
      pharmaLicense&&
      pharmaGovern &&
      pharmaPhone&&
      pharmaCity &&
      pharmaName &&
      // deliveryPass &&
      availability
    ) {
      let updatedData = {
        id: this.activeRoute.snapshot.params['id'],
        pharmacyName: pharmaName,
        password: pharmaPass,
        city: pharmaCity,
        governorate: pharmaGovern,
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
  }
}
