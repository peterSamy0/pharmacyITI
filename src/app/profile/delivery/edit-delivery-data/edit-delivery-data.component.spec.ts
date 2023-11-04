import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryDataComponent } from './edit-delivery-data.component';

describe('EditDeliveryDataComponent', () => {
  let component: EditDeliveryDataComponent;
  let fixture: ComponentFixture<EditDeliveryDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeliveryDataComponent]
    });
    fixture = TestBed.createComponent(EditDeliveryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
