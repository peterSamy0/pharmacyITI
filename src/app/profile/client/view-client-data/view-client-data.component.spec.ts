import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientDataComponent } from './view-client-data.component';

describe('ViewClientDataComponent', () => {
  let component: ViewClientDataComponent;
  let fixture: ComponentFixture<ViewClientDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClientDataComponent]
    });
    fixture = TestBed.createComponent(ViewClientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
