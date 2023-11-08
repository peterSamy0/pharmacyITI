import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Governorate } from '../interface/governorate';
import { BehaviorSubject, Subscription } from 'rxjs';
import { City } from '../interface/city';


@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})
export class GovernorateComponent {
  @Input () selectedGov!: BehaviorSubject<Governorate|null>; 
  cities?:Array<City|any>=[];
  constructor(){
    
  }
  ngOnInit(){
    // this.selectedGov.subscribe(data=>{this.cities=Object.values(data);})
    // console.log(this.cities, typeof this.cities);
    this.selectedGov.subscribe(data=>{
      this.cities =data?.cities;
      console.log(this.cities)});
  }
}
