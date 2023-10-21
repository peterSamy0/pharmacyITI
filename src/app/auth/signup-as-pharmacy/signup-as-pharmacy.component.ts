import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pharmacies } from 'src/app/interface/pharmacies';
import pharmciesData from '../../../assets/json/pharmcies.json';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-as-pharmacy',
  templateUrl: './signup-as-pharmacy.component.html',
  styleUrls: ['./signup-as-pharmacy.component.css'],
})
export class SignupAsPharmacyComponent {
  pharmacies: Pharmacies[] = pharmciesData;

  signupForm: FormGroup;
  constructor(private router: Router) {
    this.signupForm = new FormGroup({
      pharmaName: new FormControl('', [Validators.required]),
      pharmaEmail: new FormControl('', [Validators.required]),
      pharmaPhone: new FormControl('', [Validators.required]),
      pharmaLicense: new FormControl('', [Validators.required]),
      pharmaCity: new FormControl('', [Validators.required]),
      pharmaGovern: new FormControl('', [Validators.required]),
      pharmaPass: new FormControl('', [Validators.required]),
    });
  }

  addPharma() {
    console.log(this.signupForm);
    // console.log(this.signinForm.controls['userEmail'].value);
    let pharmaName = this.signupForm.controls['pharmaName'].value;
    let pharmaEmail = this.signupForm.controls['pharmaEmail'].value;
    let pharmaPhone = this.signupForm.controls['pharmaPhone'].value;
    let pharmaLicense = this.signupForm.controls['pharmaLicense'].value;
    let pharmaCity = this.signupForm.controls['pharmaCity'].value;
    let pharmaGovern = this.signupForm.controls['pharmaGovern'].value;
    let pharmaPass = this.signupForm.controls['pharmaPass'].value;
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    //  let namePattern= /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
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
          phone: pharmaPhone,
          city: pharmaCity,
          governorate: pharmaGovern,
          licenseNum: pharmaLicense,
          password: pharmaPass,
        };

        // console.log(newPharma);
        localStorage.setItem("newPharma",JSON.stringify(newPharma))
        this.pharmacies.push(newPharma);
        // console.log(this.pharmacies);
        // temporarily till we design a home page
        this.router.navigate(["/addProduct"]);

      }
    }
  }


