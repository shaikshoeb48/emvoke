import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedPatientModule } from '../patient/sharedpatient.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { BookAppointmentNewComponent } from './book-appointment-new/book-appointment-new.component';
import { BookAppointmentSearchComponent } from './book-appointment-search/book-appointment-search.component';
import { SharedAppointmentModule } from './sharedappointment.module';
import { AppointmentService } from './appointment.service';
import { BookappointmentGuard } from './bookappointment.guard' ;
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import 'flatpickr/dist/flatpickr.css';


const appointmentRoutes: Routes = [
  {
    path: '', redirectTo: '/appointment/bookappointment', pathMatch: 'full'
  },
  {
    path: 'bookappointment', component: BookAppointmentSearchComponent, canActivate: [BookappointmentGuard]
  },
  {
    path: 'appointmentCal', component: AppointmentCalendarComponent
  }
];

@NgModule({
  imports: [
    SharedAppointmentModule,
    SharedPatientModule,
    SharedModule,
    RouterModule.forChild(appointmentRoutes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    FlatpickrModule.forRoot(),
    FormsModule
  ],
  declarations: [
    AppointmentCalendarComponent,
    BookAppointmentSearchComponent,
    BookAppointmentNewComponent,
  ],
  providers: [
    //AppointmentService
  ]
})
export class AppointmentModule { }
