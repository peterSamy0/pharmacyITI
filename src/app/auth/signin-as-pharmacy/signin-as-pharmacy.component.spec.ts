import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninAsPharmacyComponent } from './signin-as-pharmacy.component';

describe('SigninAsPharmacyComponent', () => {
  let component: SigninAsPharmacyComponent;
  let fixture: ComponentFixture<SigninAsPharmacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninAsPharmacyComponent]
    });
    fixture = TestBed.createComponent(SigninAsPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
