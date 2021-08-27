import { Router, ActivatedRouteSnapshot, RouterStateSnapshot ,CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class QueueMgmtGuard implements CanActivate {
    
    constructor(private router :Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
         

        const role = localStorage.getItem('roles');
        if(role === 'admin' || role === 'reception'){
            return true;
        }
        else if(role==='doctor'){
            const docName = localStorage.getItem('doctorName');
            this.router.navigate(['/queuemgmt/doctor',docName]);

        }
        else{
            this.router.navigate(['auth/signin']);
        }
            
    }


}

