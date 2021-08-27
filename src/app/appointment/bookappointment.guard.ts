import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service' ;
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookappointmentGuard implements CanActivate {

	constructor(private router: Router , private authService: AuthService){}
  
	canActivate(): Observable<boolean> | Promise<boolean> | boolean	{

		let role = localStorage.getItem('roles') ;
		let token = localStorage.getItem('token') ;

		if(!role || !token){
			this.router.navigate(['/auth/signin']);
			return false ;
		}
		return true ;
	}

}
    