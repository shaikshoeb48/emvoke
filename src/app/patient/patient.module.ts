import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedAppointmentModule } from '../appointment/sharedappointment.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { BulkPatientComponent } from './bulk-patient/bulk-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { SharedPatientModule } from './sharedpatient.module';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { FileUploadComponent} from 'src/app/shared/components/file-upload/file-upload.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PrescriptionModule } from '../prescription/prescription.module';
// import { SharedModule } from 'src/app/shared/shared.module';
import { DatePipe } from '@angular/common';
import { PatientAlertComponent } from './patient-alert/patient-alert.component' ;
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

const patientRoutes: Routes = [
  {
    path: '', redirectTo: '/patient/patientsearch', pathMatch: 'full'
  },
  {
    path: 'patientlist', redirectTo: '/patient/addpatient'
  },
  {
    path: 'addpatient', component: AddPatientComponent, data: {
      breadcrumb: 'Add Patient'
    }
  },
  {
    path: 'bulkpatient', component: BulkPatientComponent, data: {
      breadcrumb: 'Bulk Add Patient'
    }
  },
  {
    path: 'patientsearch', component: PatientSearchComponent, data: {
      breadcrumb: 'Search Patient'
    }
  },
  {
    path: 'patientdetails', component: PatientDetailsComponent, data: {
      breadcrumb: 'Patient Details'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(patientRoutes),
    SharedAppointmentModule,
    SharedPatientModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    PrescriptionModule,
    PlotlyModule
  ],
  declarations: [
    PatientListComponent,
    BulkPatientComponent,
    PatientSearchComponent,
    PatientDetailsComponent,
    PatientAlertComponent,
  ],
  exports : [
   SharedPatientModule,
  ] ,
  providers : [DatePipe]
})
export class PatientModule { }
