import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInvalidComponent } from './payment-invalid.component';

describe('PaymentInvalidComponent', () => {
  let component: PaymentInvalidComponent;
  let fixture: ComponentFixture<PaymentInvalidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInvalidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
