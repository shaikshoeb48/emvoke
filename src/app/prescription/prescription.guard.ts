import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareService } from '../share.service' ;
import { NotificationService } from './../core/services/notification.service';
import { AuthService } from '../core/services/auth.service' ;


@Injectable({
  providedIn: 'root'
})
export class PrescriptionGuard implements CanActivate {
  
  constructor(private shareService: ShareService, private router: Router, private notificaton: NotificationService, private authService: AuthService){}	

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	const role = localStorage.getItem('roles') ;
  	const patientId = localStorage.getItem('patient_id') ;
    
  	if(!role || !patientId || role === 'admin' || role === 'reception'){
  		this.router.navigate(['/queuemgmt']) ;
  		return false ;
  	}

  	return true ;
  }
}
