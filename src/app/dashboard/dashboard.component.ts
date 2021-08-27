import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DoctorSignUpComponent } from '../auth/doctor-sign-up/doctor-sign-up.component';
import { ReceptionSignUpComponent } from '../auth/reception-sign-up/reception-sign-up.component';
import { AuthService } from '../core/services/auth.service';
import { ViewDoctorComponent } from './../doctor/view-doctor/view-doctor.component';
import { HttpHeaders } from '@angular/common/http';
import { NotificationService } from './../core/services/notification.service';
import { ShareService } from 'src/app/share.service'
import { OverlayServiceService } from 'src/app/shared/components/overlay-service.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  clinic_name;
  totalRows: number;
  totalCol: number;
  unusedCards: number;
  unusedCardsRow: number;
  totalSubscriptions: number = 0;
  noOfRows = 4;
  noOfDrAdded = 0;
  noOfDrLeft = 0;
  dashCardInfo = [

    {
      cardName: 'Admin',
      cardId: 'mlicense',
      cardIcon: 'fa-user-circle-o',
      status: 'active',
      statusIcon: '',
      cardValue: 'manageLicense'
    },
  ];

  constructor(private overlayService: OverlayServiceService, private dialog: MatDialog, private router: Router, private authService: AuthService, private notification: NotificationService, private share: ShareService) { }

  ngOnInit() {
    this.totalCol = 5;
    this.getClinicDetails();
    this.getClinicName()
  }

  async getClinicDetails() {
    const subs = this.authService.readClinicDetails();
    console.log(subs);
    if (subs) {
      (await subs).subscribe((data: any) => {
        if (data) {
          const clinicData = atob(data.Data);
          const doctorDet = JSON.parse(clinicData).doctors;
          const receptionDet = JSON.parse(clinicData).reception;
          this.getSubscriptionDetails();
          this.getReceptionDetails(receptionDet);
          this.getDoctorDetails(doctorDet);
          this.totalRows = Math.ceil(this.dashCardInfo.length / this.totalCol);
          this.share.updateClinicData(JSON.parse(clinicData));
        }
      }, (error) => console.log(error));
    }

  }

  getSubscriptionDetails() {
    this.share.subscriptionData.subscribe(
      async (a) => {
        if (Object.keys(await a).length) {
          this.totalSubscriptions = this.totalSubscriptions + Number(a.no_of_subscriptions);
          console.log(this.totalSubscriptions);
          this.unusedCards = this.totalSubscriptions;
          this.unusedCardsRow = Math.ceil(this.unusedCards / this.noOfRows);
          console.log(this.unusedCardsRow, this.unusedCards);
          console.log(this.totalSubscriptions);
          this.noOfDrLeft = Number(a.no_of_subscriptions) - this.noOfDrAdded;
        }
        else {
          this.authService.getSubscriptionDetails().then(
            (a: any) => {
              if(a){
              this.totalSubscriptions = this.totalSubscriptions + Number(a.no_of_subscriptions);
              console.log(this.totalSubscriptions);
              this.unusedCards = this.totalSubscriptions;
              this.unusedCardsRow = Math.ceil(this.unusedCards / this.noOfRows);
              console.log(this.unusedCardsRow, this.unusedCards);
              console.log(this.totalSubscriptions);
              this.noOfDrLeft = Number(a.no_of_subscriptions) - this.noOfDrAdded;
            }
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
          this.dashCardInfo.push({
            cardName: element.doctor_name,
            cardId: element.doctor_id,
            cardIcon: 'fa-user-circle',
            status: element.employment_status == "a" ? 'active' : 'inactive',
            statusIcon: 'fa fa-circle',
            cardValue: 'viewDoctor'
          });
          count++;
        }
      });
      const noOfSubscriptions = this.totalSubscriptions;
      this.totalSubscriptions = this.totalSubscriptions - count;
      this.noOfDrAdded = count;
      //  this.noOfDrLeft = noOfSubscriptions;
      console.log(count, this.totalSubscriptions)
      console.log(doctorDet)
    }
  }

  getReceptionDetails(receptionDet) {
    const receptionObj = {
      cardName: 'Receptionist',
      cardId: 'reception',
      cardIcon: 'fa-user-circle',
      status: 'inactive',
      statusIcon: 'fa fa-circle',
      cardValue: 'receptionist'
    };
    if (receptionDet.reception_id) {
      receptionObj.cardId = receptionDet.reception_id;
      receptionObj.status = 'active';
    }
    this.dashCardInfo.push(receptionObj);
  }

  onClickCard(cardDet, index) {
    if (cardDet.cardValue === 'receptionist') {
      const dialogRef = this.dialog.open(ReceptionSignUpComponent, {
        data: { receptionId: cardDet.cardId }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Reception dialog result: ${result}`);
      });
    } else if (cardDet.cardValue === 'viewDoctor' && cardDet.status === 'active') {
      console.log(cardDet.cardId);
      const dialogRef = this.dialog.open(ViewDoctorComponent, {
        width: '1100px',
        data: { type: 'dashboard', doctorId: cardDet.cardId, status: cardDet.status }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'deactivate') {
          this.dashCardInfo[index].status = 'inactive';
        }
        else if (result === 'unlink') {
          this.dashCardInfo.splice(index, 1);
          this.unusedCards++;
          this.unusedCardsRow = Math.ceil(this.unusedCards / this.noOfRows);
          this.noOfDrAdded --;
          this.noOfDrLeft ++;
        }
        if(result == "unlink"){
          this.share.updatedocterLink(result)
        }
        console.log(`Add DoctorDialog result: ${result}`);
      });
    } else if (cardDet.cardValue === 'viewDoctor' && cardDet.status === 'inactive') {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Clinic-ID': localStorage.getItem('clinicId'),
        'X-Doctor-ID': cardDet.cardId,
        Authorization: `Bearer ${token}`
      });
      this.authService.activateDoctorClinic(headers).subscribe(data => {
        if (data) {
          this.notification.show('Activation Done Successfully', 'Ok', 8000);
          this.dashCardInfo[index].status = 'active';
        }
      },
        error => console.log('activate doctor-clinic error', error));
    }

    else {

    }
  }

  onPurchaseLicense() {
    this.router.navigate(['pricing']);
  }

  getCardStatus(status) {
    if (status === 'active') {
      return 'Active';
    } else if (status === 'inactive') {
      return 'Not-activated';
    } else {
      return '';
    }
  }


  onClickAddDoctor() {
    const dialogRef = this.dialog.open(DoctorSignUpComponent, {
      data: { type: 'dashboard' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Add DoctorDialog result: ${result}`);
    });

    // this.router.navigate(['auth/doctor-signup']) ;
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  getClinicName() {
    this.share.clinicData.subscribe((a) => {
      this.clinic_name = a.name
    })
  }


  // ngAfterViewInit() {
  //   this.overlayService.showOverlay(1);
  // }

}
