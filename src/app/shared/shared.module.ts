import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { RouterModule } from '@angular/router';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CamelToRegularPipe } from '../pipes/camel-to-regular.pipe';
// import { DateTimeFormatPipe } from '../date-time-format.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    NotFoundComponent,
    CamelToRegularPipe,
    SpinnerComponent
    // SearchPipe

  ],
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CamelToRegularPipe,
    SpinnerComponent
    // DateTimeFormatPipe
  ]
})
export class SharedModule { }
