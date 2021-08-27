import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectvaccinemodalComponent } from './selectvaccinemodal.component';

describe('SelectvaccinemodalComponent', () => {
  let component: SelectvaccinemodalComponent;
  let fixture: ComponentFixture<SelectvaccinemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectvaccinemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectvaccinemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
