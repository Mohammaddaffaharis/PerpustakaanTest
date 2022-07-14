import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPeminjamanComponent } from './form-peminjaman.component';

describe('FormPeminjamanComponent', () => {
  let component: FormPeminjamanComponent;
  let fixture: ComponentFixture<FormPeminjamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPeminjamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPeminjamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
