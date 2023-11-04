import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPharmacyDataComponent } from './edit-pharmacy-data.component';

describe('EditPharmacyDataComponent', () => {
  let component: EditPharmacyDataComponent;
  let fixture: ComponentFixture<EditPharmacyDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPharmacyDataComponent]
    });
    fixture = TestBed.createComponent(EditPharmacyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
