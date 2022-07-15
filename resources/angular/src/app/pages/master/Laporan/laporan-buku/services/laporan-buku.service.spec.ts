import { TestBed } from '@angular/core/testing';

import { LaporanBukuService } from './laporan-buku.service';

describe('LaporanBukuService', () => {
  let service: LaporanBukuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaporanBukuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
