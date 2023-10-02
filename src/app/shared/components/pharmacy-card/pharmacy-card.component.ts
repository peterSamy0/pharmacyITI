import { Component, Input } from '@angular/core';
import { Pharmacy } from '../../../interface/pharmacy';

@Component({
  selector: 'app-pharmacy-card',
  templateUrl: './pharmacy-card.component.html',
  styleUrls: ['./pharmacy-card.component.css']
})

export class PharmacyCardComponent {
  @Input() item!:Pharmacy;
  ngOnInit(){
    console.log(this.item);
  }
}
