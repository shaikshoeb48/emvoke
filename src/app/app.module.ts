import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { PaymentModule } from './payment/payment.module';
import { PricingModule } from './pricing/pricing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe, CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider' ;
import { MatDatepickerModule } from '@angular/material/datepicker' ;
import { MatNativeDateModule } from '@angular/material/core' ;
import { MatFormFieldModule } from '@angular/material/form-field' ;
import { MatInputModule } from '@angular/material/input' ;
import { MatTabsModule } from '@angular/material/tabs' ;
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';

import { DragDropDirective } from './shared/directives/draganddrop.directive' ;
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { ToastrModule } from 'ngx-toastr';
// import 'flatpickr/dist/flatpickr.css';


@NgModule({
  declarations: [
    AppComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AuthModule,
    LayoutModule,
    CoreModule,
    PricingModule,
    PaymentModule,
    appRoutes,
    FormsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts,
    }),
    ToastrModule.forRoot({
      // timeOut: 10000,
      // use it for change in style in browser =>  "extendedTimeOut: 0",
      positionClass: 'toast-bottom-left',
      // preventDuplicates: true,
      progressBar:true,
      progressAnimation: 'decreasing',
      closeButton: true 
    }),

  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
    ShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
