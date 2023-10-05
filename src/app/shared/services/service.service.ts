import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/interface/product';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('assets/json/address.json')
  }
  getDataPharmacy(){
    return this.http.get('https://retoolapi.dev/2NLxkX/data')
  }
  searchProduct (query : string){
    return this.http.get<[Product]>(`https://retoolapi.dev/oK0uhq/data?=q${query}`)
  }
}
