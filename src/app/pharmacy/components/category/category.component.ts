import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medication } from 'src/app/interface/medication';
import { ServiceService } from 'src/app/shared/services/service.service';
import { CarouselService } from '../../services/carousel.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  id: number = 0;
  result: any;
  medicationCategory:string|any;
  medications!:any;
  pharmacyId:any;
  token:String = localStorage.getItem("tokent")||"";
  constructor(private http:HttpClient,private routeUrl:ActivatedRoute, private fetchMedication:ServiceService, private service: CarouselService){
    this.routeUrl.paramMap.subscribe(params => this.medicationCategory = params.get("category"));
    this.routeUrl.parent?.params.subscribe(params => {
      this.id = params['id']; // Access the value of 'id' parameter
      this.pharmacyId = params['id'];
      console.log(this.pharmacyId)
    });
  //   this.routeUrl.paramMap.subscribe(params => {this.pharmacyId = params.get("id")
  // console.log(params);});

    // get all medications
    const headers = { 'Authorization': `Bearer ${this.token}` };
    const options = { headers: headers };

    const params = {
      category: true,
      pharmacy_id: this.id,
      category_name: this.medicationCategory
    };

    console.log(options,params);

    this.http.get(`http://localhost:8000/api/pharmacyMedications`, { params: params, headers: headers }).subscribe((res: any) => {
      console.log(res);
      this.medications = res;
      console.log(this.medications,this.medicationCategory);
    });
    
  }
  
ngOnInit() {
  
  // setInterval(() => {
  //   if (this.service.isBtnClicked) {
  //     this.performSearch();
  //   }
  // }, 1000);
}

// performSearch() {
//   this.result = this.medications.filter((item: any) => {
//     return item.name.toLowerCase().includes(this.service.inputValurOfSearch.toLowerCase());
//   });
//   this.medications = this.result;
// }
}
