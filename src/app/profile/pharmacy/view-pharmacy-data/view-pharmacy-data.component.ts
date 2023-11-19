import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-view-pharmacy-data',
  templateUrl: './view-pharmacy-data.component.html',
  styleUrls: ['./view-pharmacy-data.component.css'],
})
export class ViewPharmacyDataComponent {
  pharmaData!: any;
  pharmayID!: number;
  orders!: any;
  pharmacyOrders!: Array<any>;
  daysOff!: Array<any>;
  numOforders!: number;
  numOfproducts!: number;
  token: any;
  isLoading: boolean = true;
  phone:any;
  isPending:boolean = false;
  isApproved:boolean = false;
  isRejected:boolean = false;
  userID!: number;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private urlService: UrlService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.pharmayID = this.activeRoute.snapshot.params['id'];
    this.userID = JSON.parse(localStorage.getItem('user_id') || '')
    this.token = localStorage.getItem('token');

    this.getPharmacyData();
    this.getPharmacyOrders();
    
  }

  // function to get pharamcy data
  getPharmacyData(){
    this.urlService.getPharmacy(this.pharmayID, this.token).subscribe(
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
          this.pharmaData = res.data;
          this.numOfproducts = this.pharmaData.medication.length;
          this.daysOff = this.pharmaData.daysOff;
          this.isLoading = false;
          this.PHone();
        }
      },
      (error) => this.router.navigate(['not-found'])
    );
  }

  // pharamcy to get the orders of this pharamcy
  getPharmacyOrders() {
    this.urlService.getOrders(this.token).subscribe((res: any) => {
      this.orders = res.filter(
        (order: any) =>
          order['pharmacy name'] === this.pharmaData['pharmacy_name']
      );
      this.numOforders = this.orders.length;
    });
  }

  // go to edit page
  edit() {
    this.router.navigate(['edit-pharmacy-data', this.pharmayID]);
  }

  // delete user accout
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
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'You Are Not Authorized to Delete This Account',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    );
  }

  // go to list of products
  gotoProducts(){
    this.router.navigate([`listproduct/${this.pharmayID}`])
  }

  // get image from backend
  generateImageUrl(image: string) {
    return `http://localhost:8000/storage/${image}`;
  }
  
  // get phone if exists
  PHone() {
    if(this.pharmaData.pharmacy_phone[0]['phone']){
      this.phone = this.pharmaData.pharmacy_phone[0]['phone']
      return this.phone;
    }
    this.phone = 'not available now';
    return this.phone;
  }

  // go to list of products page
  gotoAddProducts(){
    this.router.navigate([`addProduct/${this.pharmayID}`])
  }
}
