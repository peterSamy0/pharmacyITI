import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchFormComponent } from './components/search-form/search-form.component';
// import { PharmacyDetailsComponent } from '../pharmacy/pharmacy-details/pharmacy-details.component';
// import { PharmaDetailesComponent } from './components/pharma-detailes/pharma-detailes.component';
// import { PharmaListComponent } from './components/pharma-list/pharma-list.component';
// import { PharmaCardComponent } from './components/pharma-card/pharma-card.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropDownComponent,
    SearchFormComponent,
    // PharmacyDetailsComponent,
    // PharmaDetailesComponent,
    // PharmaListComponent,
    // PharmaCardComponent
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DropDownComponent,
    // PharmacyDetailsComponent,
    // PharmaDetailesComponent,
    // PharmaListComponent,
    // PharmaCardComponent
    
  ]
})
export class SharedModule { }
