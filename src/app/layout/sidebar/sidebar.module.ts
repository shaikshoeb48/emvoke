import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MalihuScrollbarModule, MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { SidebarComponent, SidebarService } from './index';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MalihuScrollbarModule.forRoot()
  ],
  declarations: [
    SidebarComponent,
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    MalihuScrollbarService,
    SidebarService
  ]
})

export class SideBarModule { }
