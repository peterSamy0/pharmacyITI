import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { City } from '../interface/city';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  @Input() city!: City;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  currentIndex = 0;

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.city.pharmacies.length - 1) {
      this.currentIndex++;
    }
  }

  isPrevDisabled() {
    return this.currentIndex === 0;
  }

  isNextDisabled() {
    return this.currentIndex === this.city.pharmacies.length - 1;
  }
}
