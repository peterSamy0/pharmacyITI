import { Component, ElementRef, ViewChild } from '@angular/core';
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
  token: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}
  ngOnInit(){
    this.id = this.activeRoute.snapshot.params['id'];
    this.token = localStorage.getItem('token')
    console.log(this.token)

    this.profileService.getDelivery(this.id).subscribe((res: any) => {
      this.deliveryId = res.data;
      this.numOforders= this.deliveryId.orders.length;
    });
    
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
    this.profileService.deleteDelivery(id).subscribe((res: any) => {
      console.log(res)
    });
  }
}
