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
  role: string | null = 'client';
  cartArr: any = [];
  constructor(private service: CartService){}
  
  ngOnInit(){
    const getRole = localStorage.getItem('role')
    this.role =  getRole;
  }

  addToCart(val:any){
    this.service.addItemToCart(val);
    val.added = true;
    this.cartArr.push(val)
    localStorage.setItem('cart', JSON.stringify(this.cartArr))
  }
  removeFromCart(val:any){
  this.service.removeItemFromCart(val.id);
  val.added = false;
  console.log(val)
  }
}

