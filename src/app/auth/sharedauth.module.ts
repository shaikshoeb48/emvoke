import { NgModule } from '@angular/core';
import { AmplifyAngularModule } from 'aws-amplify-angular';
import { ViewDoctorComponent } from '../doctor/view-doctor/view-doctor.component';
import { SharedModule } from '../shared/shared.module';
import { DoctorSignUpComponent } from './doctor-sign-up/doctor-sign-up.component';
import { AlertComponent } from './../core/components/alert/alert.component' ;
import { ClinicListComponent } from './../core/components/clinic-list/clinic-list.component' ;
import { VitalsComponent } from '../appointment/vitals/vitals.component' ;
import { ConsultComponent } from '../appointment/consult/consult.component';
import { MedicalHistoryComponent } from '../appointment/medical-history/medical-history.component';
import { FamilyHistoryComponent } from '../appointment/family-history/family-history.component';
import { PatientService } from '../patient/patient.service' ;
import {FileUploadComponent} from '../shared/components/file-upload/file-upload.component';
import { AuthService } from '../core/services/auth.service';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    AmplifyAngularModule,
    SharedModule,
    MatDialogModule,
   NgxMaterialTimepickerModule,
   FormsModule
  ],
  exports: [
    SharedModule,
    DoctorSignUpComponent,
    ViewDoctorComponent,
    AlertComponent ,
    ClinicListComponent,
    VitalsComponent,
    ConsultComponent,
    MedicalHistoryComponent,
    FamilyHistoryComponent,
   // FileUploadComponent
  ],
  declarations: [
    DoctorSignUpComponent,
    ViewDoctorComponent,
    AlertComponent,
    ClinicListComponent,
    VitalsComponent,
    ConsultComponent,
    MedicalHistoryComponent,
    FamilyHistoryComponent,
    //FileUploadComponent
    EmailConfirmComponent
  ],
  providers: [
   PatientService,
   AuthService,
   {
    provide:MatDialogRef,
    useValue:{}
  }
  ],
  entryComponents: [
    ViewDoctorComponent,
    AlertComponent,
    ClinicListComponent,
    VitalsComponent,
    ConsultComponent,
    MedicalHistoryComponent,
    FamilyHistoryComponent,
    FileUploadComponent
  ]
})

export class SharedAuthModule {
}
