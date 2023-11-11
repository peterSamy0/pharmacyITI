import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import pharmaciesData from '../../../../assets/json/pharmcies.json';
import Swal from 'sweetalert2';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-view-pharmacy-data',
  templateUrl: './view-pharmacy-data.component.html',
  styleUrls: ['./view-pharmacy-data.component.css'],
})
export class ViewPharmacyDataComponent {
  pharmaId!: any;
  id!: number;
  orders!: any;
  pharmacyOrders!: Array<any>;
  daysOff!: Array<any>;
  numOforders!: number;
  numOfproducts!: number;
  token: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}
  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.token = localStorage.getItem('token');
    this.profileService.getPharmacy(this.id, this.token).subscribe(
      (res: any) => {
        this.pharmaId = res.data;
        this.numOfproducts = this.pharmaId.medication.length;
        this.daysOff = this.pharmaId.daysOff;
      },
      (error) => this.router.navigate(['not-found'])
    );

    this.getPharmacyOrders();
  }

  getPharmacyOrders() {
    this.profileService.getOrders().subscribe((res: any) => {
      this.orders = res.filter(
        (order: any) =>
          order['pharmacy name'] === this.pharmaId['pharmacy_name']
      );
      this.numOforders = this.orders.length;
      console.log(this.numOforders);
    });
  }

  edit(id: number) {
    this.router.navigate(['edit-pharmacy-data', id]);
  }

  deleteAccount(id: number) {
    this.profileService.deletePharmacy(id, this.token).subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id');
        localStorage.removeItem('_id');
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
}
