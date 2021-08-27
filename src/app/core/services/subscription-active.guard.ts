import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionActiveGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.checkSubscription().then(
      () => {
        if (this.auth.isAdmin()) {
          this.route.navigate(['dashboard']);
          return false;
        }
        else {
          this.route.navigate(['queuemgmt']);
          return false;
        }
      }
    ).catch(
      () => {
        return true;
      }
    )
  }
}
