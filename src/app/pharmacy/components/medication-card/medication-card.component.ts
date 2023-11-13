import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/cart/servic/cart.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-medication-card',
  templateUrl: './medication-card.component.html',
  styleUrls: ['./medication-card.component.css']
})
export class MedicationCardComponent {
  @Input() prod: any;
  @Input() medication!: any;
  role: string | null = 'client';
  cartArr: any = [];
  pharmacyId:any;
  x:number=0;
  constructor(private service: CartService, private routeUrl:ActivatedRoute){
    this.routeUrl.paramMap.subscribe(params => {
      this.service.pharmacyId = Number(params.get("id"));
      this.pharmacyId = Number(params.get("id"));
    });
  }
  
  ngOnInit(){
    // get data from cart
    this.cartArr = this.service.cartItems;
    // Reset the 'added' property for all medications
    this.cartArr.forEach((item: any) => {
      item.added = false;
    });
    // get the item here if present in localStorage
    if(this.cartArr.length > 0){
      let producatFound = this.cartArr.find((item:any) => item.id == this.medication.id)
      if(producatFound){
        this.medication.added = true;
      }
    }

    console.log(this.service.cartItems);
  }

  addToCart(val:any){
    
    val.added = true;
    this.service.addItemToCart(val);
    

  }
  removeFromCart(val:any){
  this.service.removeItemFromCart(val.id);
  val.added = false;
  }
}

