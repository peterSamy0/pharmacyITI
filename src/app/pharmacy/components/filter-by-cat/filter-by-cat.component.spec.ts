import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByCatComponent } from './filter-by-cat.component';

describe('FilterByCatComponent', () => {
  let component: FilterByCatComponent;
  let fixture: ComponentFixture<FilterByCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterByCatComponent]
    });
    fixture = TestBed.createComponent(FilterByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
