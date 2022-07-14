import { TestBed } from '@angular/core/testing';

import { BukuService } from './buku.service';

describe('BukuService', () => {
  let service: BukuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BukuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
