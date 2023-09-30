import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaCardComponent } from './pharma-card.component';

describe('PharmaCardComponent', () => {
  let component: PharmaCardComponent;
  let fixture: ComponentFixture<PharmaCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmaCardComponent]
    });
    fixture = TestBed.createComponent(PharmaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
