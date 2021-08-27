import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSkindairyViewComponent } from './report-skindairy-view.component';

describe('ReportSkindairyViewComponent', () => {
  let component: ReportSkindairyViewComponent;
  let fixture: ComponentFixture<ReportSkindairyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSkindairyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSkindairyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
