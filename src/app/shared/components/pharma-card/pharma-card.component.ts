import { PharmaDetailesComponent } from './../pharma-detailes/pharma-detailes.component';
import { Router } from '@angular/router';
import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pharma-card',
  templateUrl: './pharma-card.component.html',
  styleUrls: ['./pharma-card.component.css']
})
export class PharmaCardComponent {
  @Output() emitToList=new EventEmitter();
  @Input() pharma:any;
  @Input() product:any;

  // redirectDetails(id:any){
  //   this.emitToList.emit(id)
  // }

  constructor(private router :Router) {}

  redirectDetails(id:any){
    // this.Router.navigate(['Pharma-details'])
  }

}
