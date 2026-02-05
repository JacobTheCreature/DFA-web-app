import { TestBed } from '@angular/core/testing';

import { DfaService } from './dfa.service';

describe('DfaService', () => {
  let service: DfaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DfaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
