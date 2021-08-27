import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

export const LayoutSidebarRoutes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    outlet: 'sidebar',
  }
];
