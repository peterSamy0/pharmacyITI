import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css']
})
export class PharmacyDetailsComponent implements OnInit {
  name: any;
  address: any;
  rating: any;
  number:any;
  image:any;
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
