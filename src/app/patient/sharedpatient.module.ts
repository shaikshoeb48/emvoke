import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientService } from './patient.service';
import { PersonalInfoComponent } from './add-patient/personal-info/personal-info.component';
import { SharedAuthModule } from  '../auth/sharedauth.module';
import { EmergencyContactComponent } from './add-patient/emergency-contact/emergency-contact.component';
import { PolicyComponent } from './add-patient/policy/policy.component';
import {FileUploadComponent} from 'src/app/shared/components/file-upload/file-upload.component';
import { ReactiveFormsModule } from  '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    SharedAuthModule,
    ReactiveFormsModule
  ],
  exports: [
    SharedModule,
    AddPatientComponent,
    PersonalInfoComponent,
    EmergencyContactComponent,
    PolicyComponent
  ],
  declarations: [
    AddPatientComponent,
    PersonalInfoComponent,
    EmergencyContactComponent,
    PolicyComponent,
  ],
  entryComponents: [
    AddPatientComponent,
  ],
  providers: [
    PatientService
  ]
})
export class SharedPatientModule { }
