import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsClientComponent } from './signup-as-client.component';

describe('SignupAsClientComponent', () => {
  let component: SignupAsClientComponent;
  let fixture: ComponentFixture<SignupAsClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupAsClientComponent]
    });
    fixture = TestBed.createComponent(SignupAsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
