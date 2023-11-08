import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
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

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}
  ngOnInit(){
    console.log(this.activeRoute.snapshot.params['id'])
    this.id = this.activeRoute.snapshot.params['id'];
    this.profileService.getDelivery(this.id).subscribe((res: any) => {
      this.deliveryId = res.data;
      console.log(this.deliveryId);
      this.numOforders= this.deliveryId.orders.length;
      console.log(this.numOforders)
    });
    
  }

  
  edit(id : number){
    this.router.navigate(['edit-delivery-data',id])  
  }
  
  deleteAccount(id: number) {
    this.profileService.deleteDelivery(id).subscribe((res: any) => {
      console.log(res)
    });
  }
}
