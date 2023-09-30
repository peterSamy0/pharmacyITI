import { Component, OnInit } from '@angular/core';
import { PharmaDetailsService } from '../../services/pharma-details.service';
import { Pharmacies } from 'src/app/interface/pharmacies';
// import { Pharmacies } from '../../interface/pharmacies';

@Component({
  selector: 'app-pharma-list',
  templateUrl: './pharma-list.component.html',
  styleUrls: ['./pharma-list.component.css']
})
export class PharmaListComponent implements OnInit {
  pharmArr: Pharmacies[] = [];

  constructor(private pharmaDetailsService: PharmaDetailsService) {}

  ngOnInit(): void {
    this.fetchPharmaciesData();
  }

  fetchPharmaciesData(): void {
    this.pharmaDetailsService.getData().subscribe((data: any) => {
      this.pharmArr = Object.values(data) as Pharmacies[];
    });
  }
}