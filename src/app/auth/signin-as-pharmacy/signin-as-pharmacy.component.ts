import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pharmacies } from 'src/app/interface/pharmacies';
import pharmciesData from  '../../../assets/json/pharmcies.json';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin-as-pharmacy',
  templateUrl: './signin-as-pharmacy.component.html',
  styleUrls: ['./signin-as-pharmacy.component.css']
})
export class SigninAsPharmacyComponent {

  pharmacies : Pharmacies[]= pharmciesData;

  signinForm: FormGroup;
  constructor(private router: Router) {
    this.signinForm = new FormGroup({
      pharmaEmail: new FormControl('', [Validators.required]),
      pharmaPass: new FormControl('',[Validators.required])
    });

    }

    checkPharma(){
      console.log(this.signinForm);
      // console.log(this.signinForm.controls['userEmail'].value);
     let pharmaEmail =this.signinForm.controls['pharmaEmail'].value;
     let pharmaPass =this.signinForm.controls['pharmaPass'].value;
     
     for (var i = 0; i < this.pharmacies.length; i++) {
      if (
        pharmaEmail === this.pharmacies[i].email &&
        pharmaPass == this.pharmacies[i].password
      ) {
        console.log('correct')
     
        localStorage.setItem("currentPharma", JSON.stringify(this.pharmacies[i]));
        
        return;
      }
      
}
 
    
   
  }

}
