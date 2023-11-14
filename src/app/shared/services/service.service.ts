import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url2: string = "http://localhost:8000/api/orders";

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
      return this.http.get(this.url2,{
        headers:{
          Authorization:"Bearer " + localStorage.getItem('token') 
        }
      })
  }
  getProductList(){
    return this.http.get('https://retoolapi.dev/oK0uhq/data')
  }
  getDeliveryData(){
    return this.http.get('https://retoolapi.dev/Eaiv5g/data');
  }
  getGovernorates() {
  return this.http.get('http://localhost:8000/api/governorates', { params: { home: true } });
  }
  getPharmacy(id:any){
    return this.http.get(`http://127.0.0.1:8000/api/pharmacies/${id}`)
  }


// fetching data using our api
  getPharmacies(){
    return this.http.get('http://127.0.0.1:8000/api/pharmacies')
  }
}

