import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  location: string = "Location";
  cityName: string = '';

  constructor(private service: ServiceService) { }
  // fuction used to get the location of user by set the name of governorate and it's city name

  sendLocation(val: any){
    this.location = this.cityName + ", " + val
  }
  // fuction to get the name of city 
  openSubList(val: any) {
    this.cityName = val.name
  }
}
