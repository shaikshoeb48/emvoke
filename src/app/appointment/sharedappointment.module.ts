import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppointmentService } from './appointment.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatAutocompleteModule
  ],
  declarations: [
    BookAppointmentComponent
  ],
  entryComponents: [
    BookAppointmentComponent
  ],
  providers: [AppointmentService]
})
export class SharedAppointmentModule { }
