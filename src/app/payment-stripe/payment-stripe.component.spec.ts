import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStripeComponent } from './payment-stripe.component';

describe('PaymentStripeComponent', () => {
  let component: PaymentStripeComponent;
  let fixture: ComponentFixture<PaymentStripeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentStripeComponent]
    });
    fixture = TestBed.createComponent(PaymentStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
