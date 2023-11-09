import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url2: string = "https://retoolapi.dev/UrMs5b/data";

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
  getOrders(){
      return this.http.get(this.url2)
  }
  getProductList(){
    return this.http.get('https://retoolapi.dev/oK0uhq/data')
  }
  getDeliveryData(){
    return this.http.get('https://retoolapi.dev/Eaiv5g/data');
  }

// fetching data using our api
  getPharmacies(){
    return this.http.get('http://127.0.0.1:8000/api/pharmacies')
  }
}

