import { TestBed } from '@angular/core/testing';

import { PharmaDetailsService } from './pharma-details.service';

describe('PharmaDetailsService', () => {
  let service: PharmaDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmaDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
