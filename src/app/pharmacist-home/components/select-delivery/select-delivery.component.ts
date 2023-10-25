import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-select-delivery',
  templateUrl: './select-delivery.component.html',
  styleUrls: ['./select-delivery.component.css']
})
export class SelectDeliveryComponent {

  faCheck :any = faCheck;
  faXmark :any = faXmark;
  Deliveries: any = [];
  city: string | null = '';
  constructor(private deliverService: ServiceService, private route: ActivatedRoute){}

  ngOnInit(){
    this.getDeliveryData();
    this.city = this.route.snapshot.paramMap.get("region");
    console.log(this.city)
  }

  getDeliveryData() {
    this.deliverService.getDeliveryData().subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.Deliveries = res.filter((item) => item.region === this.city);
        } else {
          console.log('Invalid response format. Expected an array.');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  select(val:any){
    (!val.isSelected || null) ? val.isSelected = true : val.isSelected = false
  }
}
