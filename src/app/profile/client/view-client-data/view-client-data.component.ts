import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

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

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}
  ngOnInit(){
    console.log(this.activeRoute.snapshot.params['id'])
    this.id = this.activeRoute.snapshot.params['id'];
    this.profileService.getClient(this.id).subscribe((res: any) => {
      this.clientId = res.data;
      console.log(this.clientId);
      this.ordersOnTheirWay= this.clientId.order.filter(
        (order: any) =>
          order['status'] === "withDelivery"
      );
      // this.numOforders = this.orders.length;
      this.numOforders= this.ordersOnTheirWay.length;
    });
    
  }


  edit(id : number){
    this.router.navigate(['edit-personal-data',id])  
  }

  deleteAccount(id: number) {
    this.profileService.deleteClient(id).subscribe((res: any) => {
      console.log(res)
    });
  }
}
