import { Component, Input } from '@angular/core';
import { Pharmacies } from 'src/app/interface/pharmacies';

@Component({
  selector: 'app-pharma-card',
  templateUrl: './pharma-card.component.html',
  styleUrls: ['./pharma-card.component.css']
})
export class PharmaCardComponent {
  @Input() item!: Pharmacies;

  ngOnInit() {
    console.log(this.item);
  }
}