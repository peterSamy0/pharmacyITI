import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninAsDeliveryComponent } from './signin-as-delivery.component';

describe('SigninAsDeliveryComponent', () => {
  let component: SigninAsDeliveryComponent;
  let fixture: ComponentFixture<SigninAsDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninAsDeliveryComponent]
    });
    fixture = TestBed.createComponent(SigninAsDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
