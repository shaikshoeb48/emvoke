import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSkindairyCreateComponent } from './report-skindairy-create.component';

describe('ReportSkindairyCreateComponent', () => {
  let component: ReportSkindairyCreateComponent;
  let fixture: ComponentFixture<ReportSkindairyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSkindairyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSkindairyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
