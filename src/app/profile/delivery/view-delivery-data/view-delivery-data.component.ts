import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import deliveriresData from  '../../../../assets/json/users.json';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-view-delivery-data',
  templateUrl: './view-delivery-data.component.html',
  styleUrls: ['./view-delivery-data.component.css']
})
export class ViewDeliveryDataComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}
  ngOnInit(){
    console.log(this.activeRoute.snapshot.params['id'])
    
  }
  deliveries: Array<any>= deliveriresData;

  deliveryId : any = deliveriresData[this.activeRoute.snapshot.params['id']-1];
  
  edit(id : number){
    this.router.navigate(['edit-delivery-data',id])  
  }
  
  deleteAccount(deliveryId: any){
   const index= this.deliveries.indexOf(this.deliveryId);
    if (index >= 0) {
      this.deliveries.splice(index, 1);
    }
    console.log(this.deliveries);
    this.router.navigate(['home']);

  }
}
