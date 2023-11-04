import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsDeliveryComponent } from './signup-as-delivery.component';

describe('SignupAsDeliveryComponent', () => {
  let component: SignupAsDeliveryComponent;
  let fixture: ComponentFixture<SignupAsDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupAsDeliveryComponent]
    });
    fixture = TestBed.createComponent(SignupAsDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
