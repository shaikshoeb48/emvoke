import { Component, OnDestroy, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router' ;
import { AuthService } from './core/services/auth.service';
import { ShareService } from './share.service';
import { Meta } from '@angular/platform-browser';
import { environment } from '../environments/environment' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  loginStatus = false;
  subStatus = false;
  loginSubscription: Subscription;
  public showSidebar = true ;
  clinicDataSubscription: Subscription ;
  userActivity;
  constructor(private auth: AuthService, private router: Router, private sharedService: ShareService,private metaService:Meta) {
    // this.checkSubscription();s
   }

  ngOnInit() {
    // console.log(environment.USERNAME)
    this.metaService.addTag(
      {name:'description',content:'Provides digital prescription,AI powered medical imaging,Appointment management,patient management,video consultation,medical grade Secured,MOHFW compatible.Specialising in Pediatrics, Gynaecology, Dermatology,ENT, Physician.'}
    )
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        if(event.url === '/prescription' || event.url == '/prescription/invoice' || event.url == '/pricing' || event.url == '/payment-pending' || event.url == '/404')
          this.showSidebar = false ;
        else
          this.showSidebar = true ;

        if(event.url == '/patient'){
          this.router.navigate(['patient/patientsearch']);
        }
      }
    });
    this.loginSubscription = this.auth.logInStatus.subscribe((value: boolean) => {
      this.loginStatus = value;
      this.clinicDataSubscription = this.sharedService.clinicData.subscribe(data => {
        if(this.loginStatus && Object.keys(data).length === 0){
          this.auth.readClinicDetails().subscribe(result => {
            const newClinicData = JSON.parse(atob(result.Data)) ;
            this.sharedService.updateClinicData(newClinicData) ;
          }, err => console.log(err));
        }
      });
    });


  }

  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  resetTimer() {
    clearTimeout(this.userActivity);
    this.setTimer();
  }

  setTimer(){
    this.userActivity = setTimeout(()=>{
      if(this.auth.logInStatus){
        this.auth.signOut();
      }
    },900000)
  }

  ngOnDestroy() {
    clearTimeout(this.userActivity);
    this.loginSubscription.unsubscribe();
    this.clinicDataSubscription.unsubscribe();
  }
}
