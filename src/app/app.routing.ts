import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { DoctorSignUpComponent } from './auth/doctor-sign-up/doctor-sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuardService } from './core/services/auth.guard.service';
import { PaymentMethodComponent } from './payment/payment-method/payment-method.component';
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';
import { PricingTemplateComponent } from './pricing/pricing-template/pricing-template.component';
import { PrescriptionComponent } from './prescription/prescription.component' ;
import { RoleGuard } from './core/services/role.guard';
import { PaymentInvalidComponent } from './core/components/payment-invalid/payment-invalid.component';
import { SubscriptionActiveGuard } from './core/services/subscription-active.guard';
import { SubscriptionGuard } from './core/services/subscription.guard';
import { NoAuthGuard } from './core/services/no-auth.guard';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { PrescriptionGuard } from './prescription/prescription.guard' ;
import { NoClinicFoundComponent } from './core/components/no-clinic-found/no-clinic-found.component';


const appRouteConfig = [
  {
    path: '',
    redirectTo: 'queuemgmt',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Queue Management'
    }
  },
  {
    path: 'auth', component: AuthLayoutComponent,
    canActivate: [NoAuthGuard],
     children: [
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'doctorsignup',
        component: DoctorSignUpComponent
      },
      {
        path: 'signin',
        component: SignInComponent
      },
      {
        path: 'confirmcode',
        component: ConfirmCodeComponent
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: 'payment-pending',
    component: PaymentInvalidComponent,
    canActivate: [SubscriptionActiveGuard]
  },
  {
    path: 'pricing',
    component: PricingTemplateComponent,
    canActivate: [AuthGuardService, RoleGuard,SubscriptionActiveGuard]
  },
  {
    path: 'paymentmethod',
    component: PaymentMethodComponent,
    canActivate: [AuthGuardService, RoleGuard]
  },
   {
    path: 'prescription',
    loadChildren: () => import('./prescription/prescription.module').then(m => m.PrescriptionModule),
    canActivate: [AuthGuardService, PrescriptionGuard],
    data: {
      breadcrumb: 'Prescription'
    }
  },
  {
    path: 'paymentsuccess',
    component: PaymentSuccessComponent,
    canActivate: [AuthGuardService, RoleGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuardService,RoleGuard,SubscriptionGuard],
    data: {
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
    canActivate: [AuthGuardService,SubscriptionGuard],
    data: {
      breadcrumb: 'Patient'
    }
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule),
    canActivate: [AuthGuardService,SubscriptionGuard],
    data: {
      breadcrumb: 'Doctor'
    }
  },
  {
    path: 'queuemgmt',
    loadChildren: () => import('./queue-mgmt/queue-mgmt.module').then(m => m.QueueMgmtModule),
    canActivate: [AuthGuardService],
    data: {
      breadcrumb: 'Queue Management'
    }
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule),
    canActivate: [AuthGuardService,SubscriptionGuard],
    data: {
      breadcrumb: 'Appointment'
    }
  },
  {
    path: 'billing',
    loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule),
    canActivate: [AuthGuardService],
    data: {
      breadcrumb: 'Billing'
    }
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuardService,SubscriptionGuard],
    data: {
      breadcrumb: 'Reports'
    }
  }
  ,
  {
    path: 'noclinicfound',
    component: NoClinicFoundComponent
  }

  ,
  {
    path:'404',component:NotfoundComponent
  },

  {
    path: '**',
    redirectTo: '/404',
    pathMatch:'full'

  }
];

export const appRoutes = RouterModule.forRoot(appRouteConfig);
