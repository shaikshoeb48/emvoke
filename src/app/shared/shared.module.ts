import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {FileUploadComponent} from './components/file-upload/file-upload.component'
import { MaterialModule } from './modules/material.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { OverlayComponent } from './components/overlay/overlay.component';
import { OverlayServiceService} from './components/overlay-service.service'
import { PortalModule } from '@angular/cdk/portal';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    // HttpClientModule,
    PortalModule,
    MatSnackBarModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    // HttpClientModule ,
    FileUploadComponent,
    OverlayComponent,
    SearchPatientComponent
  ],
  declarations: [
    FileUploadComponent,
    OverlayComponent,
    SearchPatientComponent
  ],
  providers: [
    AuthService,
    NgxImageCompressService,
    OverlayServiceService
  ]
})
export class SharedModule { }
