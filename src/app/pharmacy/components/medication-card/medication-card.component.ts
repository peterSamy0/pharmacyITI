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
  constructor(private service: CartService, private routeUrl:ActivatedRoute){
    this.routeUrl.paramMap.subscribe(params => this.service.pharmacyId = Number(params.get("id")));
  }
  
  ngOnInit(){
    const getRole = localStorage.getItem('role')
    this.role =  getRole;
  }

  addToCart(val:any){
    this.service.addItemToCart(val);
    val.added = true;
    console.log(val)
  }
  removeFromCart(val:any){
  this.service.removeItemFromCart(val.id);
  val.added = true;
  console.log(val)
  }
}

