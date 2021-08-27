import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router,private secureStorage:SecureStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.checkSubscription().then(
      () => {
        return true;
      }
    ).catch(
      () => {
        if(this.secureStorage.get('clinicInfo').length == 0){
          this.auth.signOut()
          return false;
        }
        else if (this.auth.isAdmin()) {
          this.route.navigate(['pricing']);
          return false;
        }
        else {
          this.route.navigate(['payment-pending']);
          return false;
        }
      }
    )
  }

}
