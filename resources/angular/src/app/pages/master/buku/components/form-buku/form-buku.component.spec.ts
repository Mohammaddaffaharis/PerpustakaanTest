import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBukuComponent } from './form-buku.component';

describe('FormBukuComponent', () => {
  let component: FormBukuComponent;
  let fixture: ComponentFixture<FormBukuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBukuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBukuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
