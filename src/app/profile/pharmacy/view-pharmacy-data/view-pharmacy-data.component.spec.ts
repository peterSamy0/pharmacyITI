import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPharmacyDataComponent } from './view-pharmacy-data.component';

describe('ViewPharmacyDataComponent', () => {
  let component: ViewPharmacyDataComponent;
  let fixture: ComponentFixture<ViewPharmacyDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPharmacyDataComponent]
    });
    fixture = TestBed.createComponent(ViewPharmacyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
