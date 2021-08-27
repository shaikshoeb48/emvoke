import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from './index';
import {ProfileComponent} from '../profile/profile.component'
import { MatDialogRef, MatDialogModule  } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
//import {FileUploadComponent} from 'src/app/shared/components/file-upload/file-upload.component'


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    ProfileComponent
  ],
  exports: [
    HeaderComponent,
    ProfileComponent
  ],
  providers: [
    {
      provide:MatDialogRef,
      useValue:{}
    }
  ],
  entryComponents: [
   ProfileComponent,
  // FileUploadComponent
  ]
})

export class HeaderModule { }
