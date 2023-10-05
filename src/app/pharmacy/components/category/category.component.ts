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
  id: number = 0;
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
                });
      }
      break;
      case "babyCare":{
        this.fetchMedication.getBabyCare()
        .subscribe(data=>
                {this.medications=
                 Object.values(data);
                });
      }
      break;
      case "medication":{
        this.fetchMedication.getMedication()
        .subscribe(data=>
                {this.medications=
                 Object.values(data);
                });
      }
      break;
      default:{
        this.fetchMedication.getAllProducts()
        .subscribe(data=>
                {this.medications=
                 Object.values(data);
                });
      }
    }
    
  }
ngOnInit() {
  this.routeUrl.parent?.params.subscribe(params => {
    this.id = params['id']; // Access the value of 'id' parameter
  });
}
}
