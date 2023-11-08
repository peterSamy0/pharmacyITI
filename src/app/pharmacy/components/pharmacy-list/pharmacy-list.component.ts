import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Governorate } from 'src/app/interface/governorate';
import { BehaviorSubject,} from 'rxjs';
import { City } from 'src/app/interface/city';

@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.css']
})
export class PharmacyListComponent{

  // variables
  responseData!:Array<Governorate>;
  governorates:Array<any>=[];
  selectedGov = new BehaviorSubject<Governorate | null>(null);
  // end variables
 

  constructor(private fetchPharmacies:ServiceService){
    // get data from backend
    this.fetchPharmacies.getGovernorates().subscribe(data=>{this.responseData = Object.values(data);
      // make governorate array
      this.governorates = Object.values(data).map(ele=>{
        return {
          name:ele.governorate,
          id : ele.id,
          active: ele.active
        }
      })
      // set the observable of the selected governorate
      this.selectedGov.next(

        Object.values(data).find(ele=>{
        if(ele.id == 5){
          ele.active = true;
          console.log(ele.active);
          return true;
        }else{return false};
      })) ;
      
    });
    
    
  }


  activate(event: Event) {
    let element: HTMLElement | null = event.target as HTMLElement;
  
    if (element) {
      // Get the ID of the selected governorate
      const govId = +element.id;
  
      // Deactivate all governorates
      this.governorates.forEach(gov => gov.active = false);
  
      // Find the selected governorate
      const selectedGovernorate = this.responseData.find(selected => {
        if(selected.id === govId){
          selected.active = true;
          return true;
        }else{return false}
      });

      // Update the selected governorate in the BehaviorSubject
      if (selectedGovernorate) {
        selectedGovernorate.active = true;
        this.selectedGov.next(selectedGovernorate);        

      } else {
        console.error(`Governorate with ID ${govId} not found.`);
      }
    } else {
      console.error('HTML element not found in event target.');
    }
    
  }
  
  

  }