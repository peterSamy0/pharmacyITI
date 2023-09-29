import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/interface/users';
import userData from '../../../assets/json/users.json'

@Component({
  selector: 'app-signup-as-client',
  templateUrl: './signup-as-client.component.html',
  styleUrls: ['./signup-as-client.component.css']
})
export class SignupAsClientComponent {

  users : Users[]= userData;
  signupForm: FormGroup;
  constructor() {
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required]),
      userPhone: new FormControl('', [Validators.required]),
      userFullName: new FormControl('', [Validators.required]),
      userCity: new FormControl('', [Validators.required]),
      userGovern: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required]),
      userGender: new FormControl('', [Validators.required]),
    });
  }

  addClient() {
    console.log(this.signupForm);
    // console.log(this.signinForm.controls['userEmail'].value);
    let userName = this.signupForm.controls['userName'].value;
    let userEmail = this.signupForm.controls['userEmail'].value;
    let userPhone = this.signupForm.controls['userPhone'].value;
    let userFullName = this.signupForm.controls['userFullName'].value;
    let userCity = this.signupForm.controls['userCity'].value;
    let userGender = this.signupForm.controls['userGender'].value;
    let userGovern = this.signupForm.controls['userGovern'].value;
    let userPass = this.signupForm.controls['userPass'].value;
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let fullNamePattern= /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!userEmail.match(emailPattern)) {
        console.log('invalid email format');
      } else if (!userPass.match(passPattern)) {
        console.log('wrong password format');
      }else if(!userFullName.match(fullNamePattern)){
        console.log("wrong full name format")
      } else {
        let newUser = {
          id:(this.users.length)+1,
          userName: userName,
          userPass: userPass,
          fullName: userFullName,
          gender: userGender,
          email: userEmail,
          phone: userPhone,
          city: userCity,
          governorate: userGovern
        };

        console.log(newUser);
        localStorage.setItem("newUser",JSON.stringify(newUser))
        this.users.push(newUser);
        console.log(this.users);
      }
    }
}

