import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pharmacy } from 'src/app/interface/pharmacy';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('https://retoolapi.dev/2NLxkX/data')
  }

searchProduct (query : string){
  return this.http.get<Pharmacy[]>(`https://retoolapi.dev/2NLxkX/data?=q${query}`)
}

}
