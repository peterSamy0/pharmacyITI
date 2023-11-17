import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-delivery-data',
  templateUrl: './view-delivery-data.component.html',
  styleUrls: ['./view-delivery-data.component.css']
})
export class ViewDeliveryDataComponent {

  deliveryId!:any;
  id!: number;
  orders!: any;
  numOforders!: number;
  token: any;
  deliveryImage!: any;
  isLoading: boolean = true;
  isPending:boolean = false;
   isApproved:boolean = false;
   isRejected:boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}
  ngOnInit(){
    this.id = this.activeRoute.snapshot.params['id'];
    this.token = localStorage.getItem('token')
    this.getDelliveryData()
  }


  getDelliveryData(){
    this.isLoading = true;
    this.profileService.getDelivery(this.id, this.token).subscribe(
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
        this.deliveryId = res.data;
        this.numOforders= this.deliveryId.orders.length;
        this.isLoading = false;
      }
    },
      (error) => this.router.navigate(['not-found']));
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
  
  edit(id : number){
    this.router.navigate(['edit-delivery-data',id])  
  }
  
  deleteAccount(id: number) {
    this.profileService.deleteDelivery(id, this.token).subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id');
        localStorage.removeItem('_id');
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
