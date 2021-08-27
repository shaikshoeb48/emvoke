import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoClinicFoundComponent } from './no-clinic-found.component';

describe('NoClinicFoundComponent', () => {
  let component: NoClinicFoundComponent;
  let fixture: ComponentFixture<NoClinicFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoClinicFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoClinicFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
