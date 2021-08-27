// import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReceptionSignUpComponent } from './reception-sign-up/reception-sign-up.component';
import { SharedAuthModule } from './sharedauth.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
//import { AuthService} from '../core/services/auth.service'
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    SharedAuthModule,
    // HttpClientModule,
    MatAutocompleteModule
  ],
  exports: [],
  declarations: [
    SignInComponent,
    SignUpComponent,
    ConfirmCodeComponent,
    ForgotPasswordComponent,
    AuthLayoutComponent,
    ReceptionSignUpComponent,
  ],
  providers: [
   // AuthService
  ],
  entryComponents: [
    ReceptionSignUpComponent
  ]
})

export class AuthModule {
}
