import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css']
})
export class PharmacyDetailsComponent implements OnInit {
  name: any="a";
  address: any="bens";
  rating: Number=2.4;
  number:any="+2 5215821";
  image:any="https://t4.ftcdn.net/jpg/00/89/89/91/360_F_89899105_UN5Bv2hYUx0TFzBdwpi8K1rkPzl3dYLx.jpg";
  constructor(private service: ServiceService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // ngOnInit() {
  //   this.pha
  // }

  // pharmacyData(){
  //   this.service.pharmacyData.subscribe(
  //     (res)=>{
  //       this.data=res;
  //     },
  //     (error)
  //   )
  // } 
  // constructor(private dropService: DropDownService, private service: ServiceService){}
  // ngOnInit(){
  //   this.getData()
  // }  
  // getData() {
  //   this.service.getData().subscribe(
  //     (res) => {
  //       this.data = res;
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

// }


}
