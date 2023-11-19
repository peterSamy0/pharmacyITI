import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { UrlService } from 'src/app/services/url.service';


@Component({
  selector: 'app-view-client-data',
  templateUrl: './view-client-data.component.html',
  styleUrls: ['./view-client-data.component.css']
})

export class ViewClientDataComponent {
  clientId!:any;
  id!: number;
  orders!: any;
  numOforders!: number;
  ordersOnTheirWay!:any;
  ordersPending !: any; 
  numOfPendingOrders!:number;
  token: any;
  userImage:any;
  phone:any;
  image:any;
  userID: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private urlService: UrlService
  ) {}

  ngOnInit(){
    this.id = this.activeRoute.snapshot.params['id'];
    this.userID = localStorage.getItem('user_id')
    this.token = localStorage.getItem('token');
    this.image = localStorage.getItem('image');
    this.getClientData()
  }
  
  // function to get client data 
  getClientData(){
    this.urlService.getClientData(this.id, this.token).subscribe(
      (res: any) => {
          this.clientId = res.data;
          this.getPHone();
          this.ordersOnTheirWay= this.clientId.orders.filter(
            (order: any) =>
              order['status'] === "withDelivery"
          );
          this.numOforders= this.ordersOnTheirWay.length;
          this.ordersPending= this.clientId.orders.filter(
            (order: any) =>
              order['status'] === "pending"
          );
          this.numOfPendingOrders= this.ordersPending.length;
    },
    error => this.router.navigate(['not-found']));
  }

  // go to edit page
  edit(id : number){
    this.router.navigate(['edit-personal-data',id])  
  }

  // function to delete accout
  deleteAccount() {
    this.urlService.deleteUser(this.userID , this.token).subscribe(
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

  // function to get the image of the pharamcy
  generateImageUrl() {
    return `http://localhost:8000/storage/${this.image}`;
  }

  // function to get phone number of the pharamcy if it exists or if it does not exists show not available
  getPHone() {
    if(this.clientId.client_phone[0]['phone']){
      this.phone = this.clientId.client_phone[0]['phone']
      return this.phone;
    }
    this.phone = 'not available now';
    return this.phone;
  }
}
