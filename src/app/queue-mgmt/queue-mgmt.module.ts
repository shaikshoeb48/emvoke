import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedAppointmentModule } from '../appointment/sharedappointment.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { FilterPipe } from './filter.pipe';
import { ListViewComponent } from './list-view/list-view.component';
import { QueueMgmtService } from './queue-mgmt.service';
import { AppointmentService } from '../appointment/appointment.service' ;
import { AuthGuardService } from '../core/services/auth.guard.service';
import { QueueMgmtGuard } from './queue-mgmt-guard.service';
import { DocQueueMgmtGuard } from './doc-queue-mgmt-guard.service';
import { SubscriptionGuard } from '../core/services/subscription.guard';



const queueMgmtRoutes: Routes = [
  {
    path: '', canActivate:[AuthGuardService,QueueMgmtGuard,SubscriptionGuard],component: AdminComponent
  },
  {
    path: 'doctor/:doctorId', canActivate:[AuthGuardService,DocQueueMgmtGuard] ,component: DoctorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(queueMgmtRoutes),
    FormsModule,
    SharedModule,
    SharedAppointmentModule
  ],
  declarations: [
    AdminComponent,
    DoctorComponent,
    ListViewComponent,
    FilterPipe
  ],
  providers: [
    QueueMgmtService,
    AppointmentService,
    QueueMgmtGuard,
    DocQueueMgmtGuard

  ]
})
export class QueueMgmtModule { }
