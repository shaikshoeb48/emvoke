import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    PaymentMethodComponent,
    PaymentSuccessComponent
  ],
  declarations: [
    PaymentMethodComponent,
    PaymentSuccessComponent
  ],
  providers: []
})
export class PaymentModule { }
