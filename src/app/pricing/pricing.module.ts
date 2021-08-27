import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PricingTemplateComponent } from './pricing-template/pricing-template.component';
import { PricingService } from './pricing.service';
import { HeaderModule } from '../layout/header/header.module';
@NgModule({
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [
    PricingTemplateComponent
  ],
  declarations: [
    PricingTemplateComponent
  ],
  providers: [PricingService]
})
export class PricingModule { }
