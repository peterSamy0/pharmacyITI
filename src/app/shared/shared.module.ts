import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { RouterModule } from '@angular/router';
import { PharmaCardComponent } from './components/pharma-card/pharma-card.component';
import { PharmaListComponent } from './components/pharma-list/pharma-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropDownComponent,
    SearchFormComponent,
    PharmaCardComponent,
    PharmaListComponent
    // PharmacyDetailsComponent,
    // PharmaDetailesComponent,
    // PharmaListComponent,
    

  ],
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DropDownComponent,
    // PharmacyDetailsComponent,
    // PharmaDetailesComponent,
    PharmaListComponent

  ]
})
export class SharedModule { }
