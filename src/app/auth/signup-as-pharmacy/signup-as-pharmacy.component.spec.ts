import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsPharmacyComponent } from './signup-as-pharmacy.component';

describe('SignupAsPharmacyComponent', () => {
  let component: SignupAsPharmacyComponent;
  let fixture: ComponentFixture<SignupAsPharmacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupAsPharmacyComponent]
    });
    fixture = TestBed.createComponent(SignupAsPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
