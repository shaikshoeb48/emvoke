import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedAuthModule } from '../auth/sharedauth.module';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { AddDoctorGuard } from './add-doctor-guard.service';
import { AuthGuardService } from '../core/services/auth.guard.service';



const patientRoutes: Routes = [
  {
    path: '', redirectTo: '/doctor/adddoctor', pathMatch: 'full'
  },
  {
    path: 'doctorlist', component: DoctorListComponent
  },
  {
    path: 'adddoctor',canActivate:[AuthGuardService,AddDoctorGuard], component: AddDoctorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(patientRoutes),
    SharedAuthModule,
  ],
  declarations: [
    AddDoctorComponent,
    DoctorListComponent
  ],
  providers:[
    AddDoctorGuard
  ]
})
export class DoctorModule { }
