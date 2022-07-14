import { TestBed } from '@angular/core/testing';

import { PeminjamanService } from './peminjaman.service';

describe('PeminjamanService', () => {
  let service: PeminjamanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeminjamanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
