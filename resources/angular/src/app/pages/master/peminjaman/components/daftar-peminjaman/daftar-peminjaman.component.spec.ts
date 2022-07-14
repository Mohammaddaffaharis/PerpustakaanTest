import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarPeminjamanComponent } from './daftar-peminjaman.component';

describe('DaftarPeminjamanComponent', () => {
  let component: DaftarPeminjamanComponent;
  let fixture: ComponentFixture<DaftarPeminjamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarPeminjamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarPeminjamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
