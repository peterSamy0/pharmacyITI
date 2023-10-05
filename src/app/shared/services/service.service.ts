import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  getAllProducts(){
    return this.http.get('https://retoolapi.dev/oK0uhq/data')
  }
  getCosmetics(){
    return this.http.get('https://retoolapi.dev/oK0uhq/data?Category=cosmetics')
  }
  getBabyCare(){
    return this.http.get('https://retoolapi.dev/oK0uhq/data?Category=babyCare')
  }
  getMedication(){
    return this.http.get('https://retoolapi.dev/oK0uhq/data?Category=medication')
  }
}
