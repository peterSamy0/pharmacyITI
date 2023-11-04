import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryDataComponent } from './view-delivery-data.component';

describe('ViewDeliveryDataComponent', () => {
  let component: ViewDeliveryDataComponent;
  let fixture: ComponentFixture<ViewDeliveryDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDeliveryDataComponent]
    });
    fixture = TestBed.createComponent(ViewDeliveryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
