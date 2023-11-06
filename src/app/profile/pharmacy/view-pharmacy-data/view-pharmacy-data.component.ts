import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import pharmaciesData from '../../../../assets/json/pharmcies.json';
import { ProfileService, PharmacyResponse } from '../../services/profile.service';
@Component({
  selector: 'app-view-pharmacy-data',
  templateUrl: './view-pharmacy-data.component.html',
  styleUrls: ['./view-pharmacy-data.component.css'],
})
export class ViewPharmacyDataComponent {
  pharmaId!: any;
  id!: number;
  orders!:any;
  pharmacyOrders!: Array<any>;
  numOforders!: number;
  numOfproducts !: number;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
  ) {}
  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.profileService.getPharmacy(this.id).subscribe((res:any) => {
      // console.log(res)
      this.pharmaId = res.data;
      console.log(this.pharmaId)
      console.log(this.pharmaId.image)
      this.numOfproducts=this.pharmaId.medication.length;
    })

    // this.profileService.getOrders().subscribe((res:any)=>{
    //   this.orders= res;
    // })
    this.getPharmacyOrders();
  
  }

  getPharmacyOrders(){
    this.profileService.getOrders().subscribe((res:any)=>{
      this.orders = res.filter((order:any) => order['pharmacy name'] === this.pharmaId["pharmacy_name"]);
      console.log(this.orders)
      this.numOforders = this.orders.length;
      console.log(this.numOforders)
    })
  }  

  edit(id: number) {
    this.router.navigate(['edit-pharmacy-data', id]);
  }

  deleteAccount(pharmaId: any){
  //  const index= this.pharmacies.indexOf(this.pharmaId);
  //   if (index >= 0) {
  //     this.pharmacies.splice(index, 1);
  //   }
  //   console.log(this.pharmacies);
  //   this.router.navigate(['home']);

  }
}
