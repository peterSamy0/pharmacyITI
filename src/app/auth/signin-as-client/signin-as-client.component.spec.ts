import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninAsClientComponent } from './signin-as-client.component';

describe('SigninAsClientComponent', () => {
  let component: SigninAsClientComponent;
  let fixture: ComponentFixture<SigninAsClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninAsClientComponent]
    });
    fixture = TestBed.createComponent(SigninAsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
