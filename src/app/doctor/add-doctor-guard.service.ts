import { Router, ActivatedRouteSnapshot, RouterStateSnapshot ,CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AddDoctorGuard implements CanActivate{
    
    constructor(private router :Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
     
        const role = localStorage.getItem('roles');
        if(role === 'admin' ){
            return true;
        }
        else if(role==='doctor'){
            const docName = localStorage.getItem('doctorName');
            this.router.navigate(['/queuemgmt/doctor',docName]);
        }
        else if(role === 'reception'){
            this.router.navigate(['/queuemgmt']);
        }
        else{
            this.router.navigate(['auth/signin']);
        }

    
        

    }
}

