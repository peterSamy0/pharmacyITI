import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Users } from 'src/app/interface/users';
import userData from '../../../assets/json/users.json'

@Component({
  selector: 'app-signin-as-client',
  templateUrl: './signin-as-client.component.html',
  styleUrls: ['./signin-as-client.component.css'],
})
export class SigninAsClientComponent {


  users : Users[]= userData;

  userNotFound: boolean = false;
  signinForm: FormGroup;
  constructor() {
    this.signinForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      userPass: new FormControl('',[Validators.required])
    });

    }

    checkUser(){
      console.log(this.signinForm);
      // console.log(this.signinForm.controls['userEmail'].value);
     let userEmail =this.signinForm.controls['userEmail'].value;
     let userPass =this.signinForm.controls['userPass'].value;
     
     for (var i = 0; i < this.users.length; i++) {
      if (
        userEmail === this.users[i].email &&
        userPass == this.users[i].userPass
      ) {
        console.log('correct')
     
        localStorage.setItem("currentUser", JSON.stringify(this.users[i]));
        this.userNotFound = false;
        return;
      } else if (
        userEmail !== this.users[i].email &&
        userPass !== this.users[i].userPass
      ) {
        this.userNotFound = true;
      }
      
}
 
    }
   
  }

 



