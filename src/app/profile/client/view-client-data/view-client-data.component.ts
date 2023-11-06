import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import clientsData from  '../../../../assets/json/users.json';

@Component({
  selector: 'app-view-client-data',
  templateUrl: './view-client-data.component.html',
  styleUrls: ['./view-client-data.component.css']
})
export class ViewClientDataComponent {

  constructor (private activeRoute : ActivatedRoute, private router: Router){}
  ngOnInit(){
    console.log(this.activeRoute.snapshot.params['id'])
    
  }
  clients: Array<any>= clientsData;

  clientId : any = clientsData[this.activeRoute.snapshot.params['id']-1];
  
  edit(id : number){
    this.router.navigate(['edit-personal-data',id])  
  }
  
  deleteAccount(clientId: any){
   const index= this.clients.indexOf(this.clientId);
    if (index >= 0) {
      this.clients.splice(index, 1);
    }
    console.log(this.clients);
    this.router.navigate(['home']);

  }
}
