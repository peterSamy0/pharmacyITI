import { Component } from '@angular/core';

@Component({
  selector: 'app-pharma-detailes',
  templateUrl: './pharma-detailes.component.html',
  styleUrls: ['./pharma-detailes.component.css']
})
export class PharmaDetailesComponent {
  pharmacy:Array<any>=[
    {
      name:"b",
      address:"bens",
      rating:2.4,
      number:"+2 5215821",
      image:"https://t4.ftcdn.net/jpg/00/89/89/91/360_F_89899105_UN5Bv2hYUx0TFzBdwpi8K1rkPzl3dYLx.jpg"
    },
    

  ]

}
