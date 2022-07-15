import { TestBed } from '@angular/core/testing';

import { LaporanUserService } from './laporan-user.service';

describe('LaporanUserService', () => {
  let service: LaporanUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaporanUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
