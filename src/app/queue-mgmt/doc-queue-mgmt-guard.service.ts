import { Router, ActivatedRouteSnapshot, RouterStateSnapshot ,CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class DocQueueMgmtGuard implements CanActivate{
    
    constructor(private router :Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
     
        const role = localStorage.getItem('roles');
        if(role === 'doctor'||role === 'admin' || role === 'reception'){
            return true;
        }
        else{
            
            this.router.navigate(['auth/signin']);
        }

    
        

    }
}