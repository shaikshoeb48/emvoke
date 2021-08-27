import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  patientDetails ;
  checkBooking = false ;

  private clinicDataSource = new BehaviorSubject<any>({});
  clinicData = this.clinicDataSource.asObservable();


  updateClinicData(data) {
    this.clinicDataSource.next(data);
   // console.log(data);
  };

  private imageDataSource = new BehaviorSubject<any>({});
  imageDataSh = this.imageDataSource.asObservable();

  updateImageData(data) {
    this.imageDataSource.next(data);
   // console.log(data);
  };

  private DrImageSource = new BehaviorSubject<any>({});
  DrImageData = this.DrImageSource.asObservable();

  updateDrImageData(data) {
    this.DrImageSource.next(data);
   // console.log(data);
  }

  private subscriptionDataSource = new BehaviorSubject<any>({});
  subscriptionData = this.subscriptionDataSource.asObservable();

  updateSubscriptionData(data) {
    this.subscriptionDataSource.next(data);
   // console.log(data);
  }

  private doctorLinkUpdateCheck = new BehaviorSubject<any>({});
  doctorlinkUpdateCheck$ = this.doctorLinkUpdateCheck.asObservable();

  updatedocterLink(data) {
    this.doctorLinkUpdateCheck.next(data);
  }


}
