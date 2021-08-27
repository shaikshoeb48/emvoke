import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { SideBarModule } from './sidebar/sidebar.module';
// import { ProfileComponent } from './profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component'
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    FooterModule,
    HeaderModule,
    SideBarModule,
    LayoutRoutingModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    SharedModule,
    
  ],
  exports: [
    // ProfileComponent,
  ],
  declarations: [
    // ProfileComponent,
  ],
  providers: [
    AmplifyService
  ],
  entryComponents : [
    FileUploadComponent
  ]
})
export class LayoutModule { }
