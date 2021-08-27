import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderComponent } from './components/loader/loader.component';
import { AuthGuardService } from './services/auth.guard.service';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { NotificationService } from './services/notification.service';
import { SharedAuthModule } from '../auth/sharedauth.module';
import { RouterModule } from '@angular/router';
import { PaymentInvalidComponent } from './components/payment-invalid/payment-invalid.component';
import { EmailConfirmComponent} from 'src/app/auth/email-confirm/email-confirm.component'
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HeaderModule } from '../layout/header/header.module';
import { NoClinicFoundComponent } from './components/no-clinic-found/no-clinic-found.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    SharedAuthModule,
    HeaderModule
  ],
  declarations: [
    LoaderComponent,
    PaymentInvalidComponent,
    NotfoundComponent,
    NoClinicFoundComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    NotificationService,
    LoaderService,
  ],
  exports: [
    LoaderComponent,
    PaymentInvalidComponent,
    NotfoundComponent
  ],
  entryComponents: [
    EmailConfirmComponent
  ]
})
export class CoreModule { }
