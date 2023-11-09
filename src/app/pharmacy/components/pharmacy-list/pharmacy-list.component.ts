import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DropDownService } from 'src/app/shared/services/drop-down.service';
import { faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
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
  cityName: any;
  location: string = "Location";
  data: any= "not yet";
  constructor(private service:ServiceService, private httpClient: HttpClient,
    private dropService: DropDownService,
   ){
 
  }
  
  ngOnInit() {
   this.getPharamciesData();
   this.getData();
  }

  
  getPharamciesData(){
    this.service.getPharmacies().subscribe((res :any)=>{
      
      this.pharmArr = res.data;

     
      this.pharmArr.forEach((e:any,i:any) => {
        e.id=i+1;
      });
      console.log(this.pharmArr)
    })
  }
  
  getData() {
    this.service.getData().subscribe(
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
    this.cityName = val.name
    this.showList = !this.showList;
    this.showSubList = !this.showSubList
  }
  // function to close list of cities 
  closeSubList(){
    this.showSubList = !this.showSubList
    this.showList = !this.showList;
  }
  // fucntion to save the location of user and send it to service
  sendLocation(val: any){
    this.dropService.sendLocation(val)
    this.location = this.cityName + ", " + val
    this.showSubList = false
    this.showList = false;
  }

  }