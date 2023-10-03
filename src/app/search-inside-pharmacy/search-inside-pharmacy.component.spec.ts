import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInsidePharmacyComponent } from './search-inside-pharmacy.component';

describe('SearchInsidePharmacyComponent', () => {
  let component: SearchInsidePharmacyComponent;
  let fixture: ComponentFixture<SearchInsidePharmacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInsidePharmacyComponent]
    });
    fixture = TestBed.createComponent(SearchInsidePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
