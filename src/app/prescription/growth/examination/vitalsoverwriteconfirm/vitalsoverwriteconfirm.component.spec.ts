import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsoverwriteconfirmComponent } from './vitalsoverwriteconfirm.component';

describe('VitalsoverwriteconfirmComponent', () => {
  let component: VitalsoverwriteconfirmComponent;
  let fixture: ComponentFixture<VitalsoverwriteconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsoverwriteconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsoverwriteconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
