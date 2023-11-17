import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  url1: string = "https://retoolapi.dev/oK0uhq/data";
  inputValurOfSearch: string = '';
  searchResult: object[] = [];
  isBtnClicked:boolean = false;
  public medications: any;
  constructor(private http: HttpClient) { }

  
  // getData(){
    
  //   return this.http.get(this.url1)
  // }
  getPharmaData(val:any){
    return this.http.get(`http://127.0.0.1:8000/api/pharmacies/${val}`)
  }

  medicatonsOfPharamcy(data:any){
    this.medications = data;
    console.log(data)
  }

}
