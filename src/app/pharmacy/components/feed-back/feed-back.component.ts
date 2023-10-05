import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pharmacy } from 'src/app/interface/pharmacy';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../shared/services/service.service';

import feedbacks from '../../../../assets/json/feedBack.json';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent {
  pharmacyId:string|any;
  pharmacy!:Pharmacy;
  feedbackForm: FormGroup;
  // rating: number;
  feedBacks : Array<any>= feedbacks;

  constructor(private routeUrl:ActivatedRoute, private fetchPharmacy:ServiceService, private fb: FormBuilder){

    this.routeUrl.paramMap.subscribe(params => this.pharmacyId = params.get("id"));

                //feedback
                
  this.feedbackForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  feedback: ['', Validators.required],
  rate: ['', Validators.required]
                });
                
    // this.rating = 0;
}


sendFeedback() {
  console.log(this.feedbackForm);
    //  console.log(this.signinForm.controls['userEmail'].value);
     let name =this.feedbackForm.controls['name'].value;
     let email =this.feedbackForm.controls['email'].value;
     let feedback = this.feedbackForm.controls['feedback'].value;
     let rate = this.feedbackForm.controls['rate'].value;
     console.log(name,email,feedback,rate);
     let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // console.log(rate);

         if (!email.match(emailPattern)) {
         console.log('invalid email format');
         if(name==0){
          console.log("please enter your name");
         }
         if(feedback==0){
          console.log("please enter your feedback");
         }
       } else {

        let newFeedBack=
        {
          PharmacyId: parseInt(this.pharmacyId),
          email:email,
         feedback:feedback,
         rate: parseInt(rate)
      };

      // console.log(newFeedBack);
      localStorage.setItem("newFeedback",JSON.stringify(newFeedBack))
      this.feedBacks.push(newFeedBack);
      console.log(this.feedBacks);
    }
       }
}
