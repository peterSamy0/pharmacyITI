import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medication } from 'src/app/interface/medication';
import { CarouselService } from '../../services/carousel.service';
import { CartService } from 'src/app/cart/servic/cart.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  id: number = 0;
  result: any;
  medicationCategory:string|any;
  allMedications!:Array<Medication>;
  medications!:Array<Medication>;
  isLoading: boolean = true;
  products: any;
  constructor(
    private routeUrl:ActivatedRoute, 
    private service: CarouselService,

    ){
    this.routeUrl.paramMap.subscribe(params => this.medicationCategory = params.get("cat"));
    this.medicationCategory = this.routeUrl.snapshot.paramMap.get('cat')
    
    const medications = sessionStorage.getItem('medications') || '[]';
    this.allMedications = JSON.parse(medications)

    const id = sessionStorage.getItem('pharamcyID') || '';
    this.id = JSON.parse(id)
  }
ngOnInit() {
  this.performSearch();
}

performSearch() {
  this.result = this.allMedications.filter((item: any) => {
    return item.medicine_category == this.medicationCategory;
  });
  this.medications = this.result
}


}
