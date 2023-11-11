import { Component } from '@angular/core';
import { DropDownService } from '../../services/drop-down.service';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent  {
  // some variable to hold values like loction, city and some font awesome icons 
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
  constructor(private dropService: DropDownService, private service: ServiceService){} // inject the drop down service 
  
  
  ngOnInit(){
    this.getData()// import governorates and cities form service
  }
  // get the data from json file using service
  getData() {
    this.service.getGovernorates().subscribe(
      (res) => {
        this.data = res;
        console.log(res)
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
