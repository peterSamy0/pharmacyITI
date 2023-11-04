import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientDataComponent } from './edit-client-data.component';

describe('EditClientDataComponent', () => {
  let component: EditClientDataComponent;
  let fixture: ComponentFixture<EditClientDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditClientDataComponent]
    });
    fixture = TestBed.createComponent(EditClientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
