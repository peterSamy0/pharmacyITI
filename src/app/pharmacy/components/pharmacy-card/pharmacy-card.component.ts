import { Component, Input } from '@angular/core';
import { Pharmacy } from '../../../interface/pharmacy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pharmacy-card',
  templateUrl: './pharmacy-card.component.html',
  styleUrls: ['./pharmacy-card.component.css']
})

export class PharmacyCardComponent {
  constructor(private router:Router){}
  @Input() item!:Pharmacy;
  ngOnInit(){
  }
  goToDetails(id:number){
    this.router.navigate(["/pharmacy",id]);
  }
}
