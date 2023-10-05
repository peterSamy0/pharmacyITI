import { Component, Input } from '@angular/core';
import { Medication } from 'src/app/interface/medication';

@Component({
  selector: 'app-medication-card',
  templateUrl: './medication-card.component.html',
  styleUrls: ['./medication-card.component.css']
})
export class MedicationCardComponent {
  // @Input() prod: any;
  // @Input() cat: any;
  // @Input() getActiveIndex: any;
  // visibleItems:number = 5;
  @Input() medication!: Medication;
  
}

