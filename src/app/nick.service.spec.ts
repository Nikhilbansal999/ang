import { TestBed } from '@angular/core/testing';

import { NickService } from './nick.service';

describe('NickService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NickService = TestBed.get(NickService);
    expect(service).toBeTruthy();
  });
});
