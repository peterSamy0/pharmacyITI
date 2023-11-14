import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';


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
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
  ) {}
  ngOnInit(){
    this.id = this.activeRoute.snapshot.params['id'];
    this.token = localStorage.getItem('token');
    this.image = localStorage.getItem('image');
    this.getClientData()
  }
  
  getClientData(){
    this.profileService.getClient(this.id, this.token).subscribe(
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

  edit(id : number){
    this.router.navigate(['edit-personal-data',id])  
  }

  deleteAccount(id: number) {
    this.profileService.deleteClient(id, this.token).subscribe(
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
  generateImageUrl() {
    return `http://localhost:8000/storage/${this.image}`;
  }

  getPHone() {
    if(this.clientId.client_phone[0]['phone']){
      this.phone = this.clientId.client_phone[0]['phone']
      return this.phone;
    }
    this.phone = 'not available now';
    return this.phone;
  }
}
