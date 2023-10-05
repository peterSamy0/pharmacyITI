import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  url: string = "https://retoolapi.dev/oK0uhq/data";
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.url)
  }

}