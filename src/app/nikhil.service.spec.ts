import { TestBed } from '@angular/core/testing';

import { NikhilService } from './nikhil.service';

describe('NikhilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NikhilService = TestBed.get(NikhilService);
    expect(service).toBeTruthy();
  });
});
