import { TestBed } from '@angular/core/testing';

import { ResidentAccountService } from './resident-account.service';

describe('ResidentAccountService', () => {
  let service: ResidentAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidentAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
