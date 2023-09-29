import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaListComponent } from './pharma-list.component';

describe('PharmaListComponent', () => {
  let component: PharmaListComponent;
  let fixture: ComponentFixture<PharmaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmaListComponent]
    });
    fixture = TestBed.createComponent(PharmaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
