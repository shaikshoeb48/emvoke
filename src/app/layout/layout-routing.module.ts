import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutFooterRoutes, LayoutHeaderRoutes, LayoutSidebarRoutes } from './index';

@NgModule({
  imports: [
    RouterModule.forChild([
      ...LayoutFooterRoutes,
      ...LayoutHeaderRoutes,
      ...LayoutSidebarRoutes,
    ]),
  ],
  exports: [
    RouterModule,
  ],
})

export class LayoutRoutingModule { }
