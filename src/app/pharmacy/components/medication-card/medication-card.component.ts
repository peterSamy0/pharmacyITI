import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/cart/servic/cart.service';

@Component({
  selector: 'app-medication-card',
  templateUrl: './medication-card.component.html',
  styleUrls: ['./medication-card.component.css']
})
export class MedicationCardComponent {
  @Input() prod: any;
  @Input() medication!: any;

  constructor(private service: CartService){}
  addToCart(val:any){
    this.service.addItemToCart(val);
    val.added = true;
  }
}

