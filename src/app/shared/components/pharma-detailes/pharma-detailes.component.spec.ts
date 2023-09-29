import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaDetailesComponent } from './pharma-detailes.component';

describe('PharmaDetailesComponent', () => {
  let component: PharmaDetailesComponent;
  let fixture: ComponentFixture<PharmaDetailesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmaDetailesComponent]
    });
    fixture = TestBed.createComponent(PharmaDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
