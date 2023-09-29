import { Component } from '@angular/core';

@Component({
  selector: 'app-pharma-list',
  templateUrl: './pharma-list.component.html',
  styleUrls: ['./pharma-list.component.css']
})
export class PharmaListComponent {
  // recevedFromCard(id:any){
  //   alert(id)
  // }
  pharmacy:Array<any>=[
    {
      id:1,
      name:"a",
      address:"aaaaexample",
      rating:4.5,
      number:"+2 123456789",
      product:["cream","lotion"]
    },
    {
      id:2,
      name:"b",
      address:"bbbbbexample",
      rating:4,
      number:"+2 123456789",
      product:["cream","lotion"]
    },
    {
      id:3,
      name:"c",
      address:"ccccccexample",
      rating:3.1,
      number:"+2 123456789",
      product:["cream","lotion"]
    },
    {
      id:4,
      name:"d",
      address:"dddddexample",
      rating:1.3,
      number:"+2 123456789",
      product:["cream","lotion"]
    }
  ]

}
