import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import pharmaciesData from '../../../../assets/json/pharmcies.json';
import {
  ProfileService,
  PharmacyResponse,
} from '../../services/profile.service';
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
  numOforders!: number;
  numOfproducts!: number;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}
  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.profileService.getPharmacy(this.id).subscribe((res: any) => {
      this.pharmaId = res.data;
      console.log(this.pharmaId);
      this.numOfproducts = this.pharmaId.medication.length;
    });

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
    this.profileService.deletePharmacy(id).subscribe((res: any) => {
      console.log(res)
    });
  }
}
