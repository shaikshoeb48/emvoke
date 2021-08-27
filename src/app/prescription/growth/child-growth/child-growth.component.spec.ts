import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildGrowthComponent } from './child-growth.component';

describe('ChildGrowthComponent', () => {
  let component: ChildGrowthComponent;
  let fixture: ComponentFixture<ChildGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
