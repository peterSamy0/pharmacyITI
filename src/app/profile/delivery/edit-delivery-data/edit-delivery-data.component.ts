import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import deliveriesData from '../../../../assets/json/users.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';
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
  constructor(private activeRoute: ActivatedRoute, private router: Router, private profileService: ProfileService,
    private http: HttpClient) {
    this.updateDeliveryForm = new FormGroup({
      deliveryFullName: new FormControl('', [Validators.required]),
      // deliveryUserName: new FormControl('', [Validators.required]),
      deliveryPhone: new FormControl('', [Validators.required]),
      deliveryEmail: new FormControl('', [Validators.required]),
      deliveryCity: new FormControl('', [Validators.required]),
      deliveryGovern: new FormControl('', [Validators.required]),
      deliveryPass: new FormControl('', [Validators.required]),
      avaliableToDeliver: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log(this.activeRoute.snapshot.params['id']);
    this.id = this.activeRoute.snapshot.params['id'];
    this.profileService.getDelivery(this.id).subscribe((res: any) => {
      this.deliveryId = res.data;
      console.log(this.deliveryId);
         if (this.deliveryId.available== 0){
          this.availableToDeliver = false;
          console.log(this.availableToDeliver)
         }else{
          this.availableToDeliver = true;
         }

    });
    
  }

  update() {
    console.log(this.updateDeliveryForm.value);
    let deliveryFullName =this.updateDeliveryForm.controls['deliveryFullName'].value;
    let deliveryEmail = this.updateDeliveryForm.controls['deliveryEmail'].value;
    // let deliveryUserName =this.updateDeliveryForm.controls['deliveryUserName'].value;
    let deliveryPhone = this.updateDeliveryForm.controls['deliveryPhone'].value;
    let deliveryCity = this.updateDeliveryForm.controls['deliveryCity'].value;
    // let deliveryPass = this.updateDeliveryForm.controls['deliveryPass'].value;
    let deliveryGovern = this.updateDeliveryForm.controls['deliveryGovern'].value;
    let availability =this.updateDeliveryForm.controls['avaliableToDeliver'].value;

    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let fullNamePattern =
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!deliveryEmail.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
    } 
    // else if (!deliveryPass.match(passPattern)) {
    //   console.log('wrong password format');
    //   this.passFail = true;
    // }
    
    else if (!deliveryFullName.match(fullNamePattern)) {
      console.log('wrong full name format');
      this.userFullNameFail = true;
    } 
    else if (
      deliveryEmail &&
      // deliveryUserName &&
      deliveryFullName &&
      deliveryGovern&&
      deliveryCity &&
      deliveryPhone &&
      // deliveryPass &&
      availability
    ) {
      let updatedData = {
        id: this.activeRoute.snapshot.params['id'],
        // userName: deliveryUserName,
        // userPass: deliveryPass,
        fullName: deliveryFullName,
        // gender: this.deliveryId.gender,
        email: deliveryEmail,
        phone: deliveryPhone,
        city: deliveryCity,
        governorate: deliveryGovern,
      
      };
      localStorage.setItem('updatedData', JSON.stringify(updatedData));
      this.passFail = false;
      this.emailFail = false;
      this.userFullNameFail = false;
      this.deliveryId = { ...this.deliveryId, ...updatedData };
      console.log(this.deliveryId, this.deliveries, availability);
    } else {
      this.notAllDataEntered = true;
    }
  }
}
