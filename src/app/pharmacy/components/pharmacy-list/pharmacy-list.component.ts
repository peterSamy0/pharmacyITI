import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { DropDownService } from 'src/app/shared/services/drop-down.service';
import { faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.css']
})
export class PharmacyListComponent{
  pharmArr!:any;
  idArr!: any;
  faSearch = faSearch;
  searchText='';
  faAngleRight = faAngleRight
  faLocation = faLocationDot
  faAngleDown =faAngleDown;
  faAngleLeft = faAngleLeft
  showList: boolean = false;
  showSubList: boolean = false;
  cities: any;
  GovernorateName: any;
  location: string = "Location";
  data: any= "not yet";
  page :number=1;
  totalLength:any;
  originalPharmArr: any[] = [];
  phone: any;
  isLoading:boolean = true;
  constructor(private service:ServiceService, private httpClient: HttpClient,
    private dropService: DropDownService,
    private router:Router,
    private urlService: UrlService
   ){
 
  }
  
  ngOnInit() {
   this.getPharamciesData();
   this.getData();
  }
  
// function to ger all pharamcies data
 getPharamciesData() {
  this.isLoading = true;
  this.urlService.getPharmaciesData().subscribe((res: any) => {
    this.pharmArr = res.data;
    this.originalPharmArr = [...this.pharmArr]; // Save a copy of the original data
    this.totalLength = this.pharmArr.length;
    this.pharmArr.forEach((e: any, i: any) => {
      e.id = i + 1;
    });
    this.isLoading = false;
  });
}

// function to show the selected location 
sendLocation(val: any) {
  this.dropService.sendLocation(val);
  this.location = this.GovernorateName + ", " + val;
  this.showSubList = false;
  this.showList = false;

  // Apply filtering to originalPharmArr instead of creating a new array
  this.pharmArr = this.originalPharmArr.filter((pharma: any) => {
    return pharma['Governorate'] === this.GovernorateName && pharma['city'] === val;
  });
}

// function to get all gavernorates 
getData() {
  this.urlService.getGovernorates().subscribe(
    (res) => {
      this.data = res;
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

// function to open or close the list of governorates 
openList() {
  this.showList = !this.showList;
  if (this.showSubList === true) {this.showSubList = false}
}

// function to open the list of cities in governorates
openSubList(val: any) {
  this.dropService.openSubList(val)
  this.cities = val.cities;
  this.GovernorateName = val.governorate;
  this.showList = !this.showList;
  this.showSubList = !this.showSubList;
}

// function to close list of cities 
closeSubList(){
  this.showSubList = !this.showSubList
  this.showList = !this.showList;
}
// move to the details page
goToDetails(id:number){
  this.router.navigate(["/pharmacy",id]);
}

// get phone number 
getPhone(val:any){
  if(val.pharmacy_phone > 0){
    this.phone = val.pharmacy_phone[0]['phone']
  }else{
    this.phone = 'not available now';
    return this.phone;
  }
  console.log('no')
}

}
