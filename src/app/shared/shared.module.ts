import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { PharmacyDetailsComponent } from '../pharmacy/pharmacy-details/pharmacy-details.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropDownComponent,
    SearchFormComponent,
    PharmacyDetailsComponent
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DropDownComponent,
    PharmacyDetailsComponent
    
  ]
})
export class SharedModule { }
