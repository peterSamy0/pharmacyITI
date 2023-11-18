import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-view-delivery-data',
  templateUrl: './view-delivery-data.component.html',
  styleUrls: ['./view-delivery-data.component.css']
})
export class ViewDeliveryDataComponent {

  deliveryData!:any;
  deliveryID!: number;
  orders!: any;
  numOforders!: number;
  token: any;
  deliveryImage!: any;
  isLoading: boolean = true;
  isPending:boolean = false;
  isApproved:boolean = false;
  isRejected:boolean = false;
  userID!: number;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private urlService: UrlService
  ) {}
  ngOnInit(){
    this.deliveryID = this.activeRoute.snapshot.params['id'];
    this.userID = JSON.parse(localStorage.getItem('user_id') || '');
    this.token = localStorage.getItem('token')
    this.getDeliveryData()
  }


  // get client data to show inside the input field
  getDeliveryData(){
    this.isLoading = true;
    this.urlService.getDeliveryData(this.deliveryID, this.token).subscribe(
    (res: any) => {
      if(res == 'pending'){
        this.isPending = true;
        this.isRejected = false;
        this.isApproved = false;
        this.isLoading = false;
      }else if(res == 'rejected'){
        this.isRejected = true;
        this.isPending = false;
        this.isApproved = false;
        this.isLoading = false;
      }else{
        this.isApproved = true;
        this.isRejected = false;
        this.isPending = false;
        this.deliveryData = res.data;
        this.numOforders= this.deliveryData.orders.length;
        this.isLoading = false;
      }
    },
      (error) => this.router.navigate(['not-found']));
    }
  @ViewChild("myCheckbox")
  myCheckbox!: ElementRef;

  // change delivery status
  changeBtn() {
      const checkboxValue = this.myCheckbox.nativeElement.checked;
      console.log('Checkbox value:', checkboxValue);
      if(checkboxValue == false){
        this.deliveryData.available= 0;
        console.log( this.deliveryData.available)
      }
      else{
        this.deliveryData.available= 1;
        console.log( this.deliveryData.available)
      }
  }
  
  // go to edit page
  edit(id : number){
    this.router.navigate(['edit-delivery-data',id])  
  }
  
  // delete user account
  deleteAccount() {
    this.urlService.deleteUser(this.userID, this.token).subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id');
        localStorage.removeItem('_id');
        localStorage.removeItem('image');
        window.location.href = '/';
      },
      error => {
        Swal.fire({
            title: 'Error!',
            text: 'You Are Not Authorized to Delete This Account',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
    );
  }

  generateImageUrl(image: string) {
    return `http://localhost:8000/storage/${image}`;
  }

}
