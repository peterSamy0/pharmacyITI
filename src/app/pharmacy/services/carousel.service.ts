import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  inputValurOfSearch: string = '';
  searchResult: object[] = [];
  isBtnClicked:boolean = false;
  public medications: any;
  constructor(private urlService: UrlService) { }

  // getPharmaData(val:any){
  //   return this.urlService.getPharmacyData(val)
  // }

  medicatonsOfPharamcy(data:any){
    this.medications = data;
  }

}
