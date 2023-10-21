import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropDownComponent,
    SearchFormComponent,
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
  ]
})
export class SharedModule { }
