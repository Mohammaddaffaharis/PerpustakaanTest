import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarBukuComponent } from './daftar-buku.component';

describe('DaftarBukuComponent', () => {
  let component: DaftarBukuComponent;
  let fixture: ComponentFixture<DaftarBukuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarBukuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarBukuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
