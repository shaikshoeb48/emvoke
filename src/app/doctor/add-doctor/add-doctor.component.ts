import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/share.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  totalSubscriptions: any = 0;
  // count: number;
  addDrVisible = true;

  constructor(private share: ShareService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getClinicDetails();

  }

  async getClinicDetails() {
    const subs = this.authService.readClinicDetails();
    console.log(subs);
    if (subs) {
      (await subs).subscribe((data: any) => {
        if (data) {
          const clinicData = atob(data.Data);
          const doctorDet = JSON.parse(clinicData).doctors;
          this.getSubscriptionDetails();
          this.getDoctorDetails(doctorDet);
          this.share.updateClinicData(JSON.parse(clinicData));
          // if (this.count < this.totalSubscriptions) {
          //   console.log("keep page");
          //   console.log(this.count, this.totalSubscriptions)
          //   this.addDrVisible = true;
          // } else {
          //   console.log("hide page");
          //   this.addDrVisible = false;
          //   console.log(this.count, this.totalSubscriptions)
          // }
        }        
      }, (error) => console.log(error));
    }

  }

  getSubscriptionDetails() {
    this.share.subscriptionData.subscribe(
      async (a) => {
        if (Object.keys(await a).length) {
          this.totalSubscriptions = this.totalSubscriptions+ Number(a.no_of_subscriptions);
          console.log(this.totalSubscriptions);
        }
        else {
          this.authService.getSubscriptionDetails().then(
            (a: any) => {
              this.totalSubscriptions = this.totalSubscriptions + Number(a.no_of_subscriptions);
              console.log(this.totalSubscriptions);
            }
          )
        }
      }
    )
  }

  getDoctorDetails(doctorDet) {
    if (doctorDet) {
      let count = 0;
      doctorDet.forEach(element => {
        if (element.employment_status !== 'released') {
          // count++;
          this.totalSubscriptions --;
        }
      });
      console.log(count, this.totalSubscriptions)
    }
  }

  routePricing() {
    this.router.navigate(['pricing'])
  }

}
