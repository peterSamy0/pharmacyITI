import { Component, OnInit } from '@angular/core';
import { ScrollService } from './scroll.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pharmacy';
  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.setScrollTopOnRouteChange();
  }
}
