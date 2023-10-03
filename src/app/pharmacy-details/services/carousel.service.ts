import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  url: string = "assets/json/pharmacyDetails";
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get("assets/json/pharmacyDetails.json")
  }

}
