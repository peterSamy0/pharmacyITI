import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medication } from 'src/app/interface/medication';
import { ServiceService } from 'src/app/shared/services/service.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  medicationCategory:string|any;
  medications!:Array<Medication>;
  constructor(private routeUrl:ActivatedRoute, private fetchMedication:ServiceService){

    this.routeUrl.paramMap.subscribe(params => this. medicationCategory = params.get("category"));
    switch(this.medicationCategory){
      case "cosmetics":{
        this.fetchMedication.getCosmetics()
        .subscribe(data=>
                {this.medications=
                 Object.values(data);
                 console.log(this.medicationCategory)
                });
      }
      break;
      case "babyCare":{
        this.fetchMedication.getBabyCare()
        .subscribe(data=>
                {this.medications=
                 Object.values(data);
                 console.log(this.medicationCategory)
                });
      }
      break;
      case "medication":{
        this.fetchMedication.getMedication()
        .subscribe(data=>
                {this.medications=
                 Object.values(data);
                 console.log(this.medicationCategory)
                });
      }
      break;
      default:{
        this.fetchMedication.getAllProducts()
        .subscribe(data=>
                {this.medications=
                 Object.values(data);
                 console.log(this.medicationCategory)
                });
      }
    }
    
  }
  ngOnInit(){
    console.log("hello", this.medications);
    
  }
}
