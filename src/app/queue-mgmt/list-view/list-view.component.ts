import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { trigger, transition, animate, style , query , group  } from '@angular/animations'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BookAppointmentComponent } from '../../appointment/book-appointment/book-appointment.component';
import { QueueMgmtService } from '../queue-mgmt.service';
import { VitalsComponent } from '../../appointment/vitals/vitals.component' ;
import { ConsultComponent } from '../../appointment/consult/consult.component' ;
import { AlertComponent } from './../../core/components/alert/alert.component' ;
import { AppointmentService } from '../../appointment/appointment.service';
import { NotificationService } from '../../core/services/notification.service';
import { ShareService } from '../../share.service' ;
import {AuthService} from  './../../core/services/auth.service';
import * as moment from  'moment';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
   animations: [
    trigger('slideAnimation', [
      transition(':increment', group([
        query(':enter',  [
          style({
            transform: 'translateX(100%)'
          }),
          animate('0.4s ease-out', style('*'))
        ]),
        // query(':leave', [
        //   animate('0.5s ease-out', style({
        //     transform: 'translateX(-100%)'
        //   }))
        // ])
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({
            transform: 'translateX(-100%)'
          }),
          animate('0.4s  ease-out', style('*'))
        ]),
        // query(':leave', [
        //   animate('0.6s ease-out', style({
        //     transform: 'translateX(100%)'
        //   }))
        // ])
      ]))
    ])
  ]
})
export class ListViewComponent implements OnInit {


  all = "tab activeTab" ;
  queue = "tab" ;
  consulting = "tab" ;
  cancelled = "tab" ;
  seen = "tab";

  currentTab = 0 ;
   role ;

  @Input()  listData;
  @Output() reload = new EventEmitter();
  listDatafiltered: any = [];
  today: number = Date.now();
  doctorName;
  currentDate;
  sub1:any;
  currentTime;
  consultationCharge;
  currentDoctorId
  constructor(public queuemgmtService: QueueMgmtService, private appointmentService: AppointmentService, private dialog: MatDialog,private router:Router,
    private datepipe:DatePipe, private notification: NotificationService, private shareService: ShareService, private authService: AuthService) {

     }

  ngOnInit() {
    //this.doctorName=localStorage.getItem('docName');
    //let cardDate =this.queuemgmtService.getAppointmentDate();
    this.currentDoctorId = localStorage.getItem('doctorId')
    this.role = localStorage.getItem('roles') ;
    this.shareService.clinicData.subscribe((data)=>{
      if(Object.keys(data).length){
      this.onCalculateConsultationFees(data)
      }
    })

    this.queuemgmtService.datechange$.subscribe(date => {
      this.currentDate = date;
    });

    this.listData.sort((a, b) => {
      if ((new Date(a.check_in_time).getTime()) > (new Date(b.check_in_time).getTime())) {
        return 1;
      } else if ((new Date(a.check_in_time).getTime()) < (new Date(b.check_in_time).getTime())) {
        return -1;
      } else {
        return 0;
      }
    });

    this.getWaitingTime(this.listData);
    this.subscribeService(this.listData);
  }


   ngOnChanges() {
    this.listData.sort((a, b) => {
      if ((new Date(a.check_in_time).getTime()) > (new Date(b.check_in_time).getTime())) {
        return 1;
      } else if ((new Date(a.check_in_time).getTime()) < (new Date(b.check_in_time).getTime())) {
        return -1;
      } else {
        return 0;
      }
    });
    if (this.sub1) {
      clearInterval(this.sub1);
    }
    this.getWaitingTime(this.listData);
    this.subscribeService(this.listData);


     if (this.currentDate) {
       this.listDatafiltered = this.listDatafiltered.filter(data => data.date == this.currentDate);
     }
   }

   subscribeService(listData) {
    this.sub1=setInterval(() => {
    this.getWaitingTime(listData);
    },300000);
  }

  getWaitingTime(listData){
    this.currentTime =new Date()
    listData.forEach((data)=>{
        let temp = moment(data.unfilteredAppointmentTime)
        let final;
        if(moment(temp).isSame(Date.now(), 'day') && data.status == "Queue"){
          let waitingTimeMinutes = temp.diff(this.currentTime,'minutes')
          if(waitingTimeMinutes >= 0){
            let hours = Math.floor(waitingTimeMinutes / 60)
            let minutes = waitingTimeMinutes % 60
            final = hours + "h:" + minutes +"m";
          }
          else{
            final = "00h:00m"
          }
        }
        else{
          final = '--';
        }
        data['waitingTime'] = final;
    })
    this.listDatafiltered = this.listData;
    switch(this.currentTab) {
      case 1: this.filterBy('Queue');
              break;
      case 2: this.filterBy('Consulting');
              break;
      case 3: this.filterBy('Cancelled');
              break;
      case 4: this.filterBy('Seen');
              break;
    }

    if (this.currentDate) {
      this.listDatafiltered = this.listDatafiltered.filter(data => data.date == this.currentDate);
    }

 }


  onCalculateConsultationFees(doctorCompleteData){
    if(doctorCompleteData){
      this.consultationCharge = doctorCompleteData['doctors'].filter((doc)=>{ return doc.doctor_id == this.currentDoctorId}).filter((activeDoc)=>{
        return activeDoc.employment_status == 'a'
      }).map((data)=>{
        return{'consultation_charges_offline':data.consultation_charges_offline,'consultation_charges_online':data.consultation_charges_online}
      })[0]
    }

  }

  onStartConsult(item) {
    const data = {
      state_appointment: 'Consulting',
      _id: item.appointment_id,
      patient_id: item.patient_id,
      clinic_id: localStorage.getItem('clinicId')
    };
    this.appointmentService.appointmentCreate(data, 'patch').subscribe(data => {
      if (data) {
        this.router.navigate(['/prescription']) ;
        // this.notification.show('Appointment Cancelled', 'Ok', 8000);
        // this.reload.emit(this.currentDate);
      }
    },
    error => console.log('Appointment Start Consult error', error));
  }


 onClickVitals(item) {
   if(this.role === 'doctor'){
     this.onStartConsult(item);
     localStorage.setItem('appointment_id' , item.appointment_id) ;
     localStorage.setItem('patient_id' , item.patient_id) ;
   }
   else{
     const dialogRef = this.dialog.open(ConsultComponent , {
       width : '1600px',
       height : '95vh',
       data : item
     });
     dialogRef.afterClosed().subscribe(result => {
     }, error => {});
   }
 }

 onCancelAppointment(item) {
  const alertDialogRef = this.dialog.open(AlertComponent , {
    width : '400px' ,
    data : {
            title : 'Are you sure?',
            message: "The appointment will be cancelled" ,
          }
  });
  alertDialogRef.afterClosed().subscribe(result => {
    if(result === 'okay') {
      const data = {
        state_appointment: 'Cancelled',
        _id: item.appointment_id,
        patient_id: item.patient_id,
        clinic_id: localStorage.getItem('clinicId')
      };
      this.appointmentService.appointmentCreate(data, 'patch').subscribe(data => {
        if (data) {
          this.notification.show('Appointment Cancelled', 'Ok', 8000);
          this.reload.emit(this.currentDate);
        }
      },
      error => console.log('Appointment Cancellation error', error));
    } else {
    }
  });
 }


  isCurrentTab(index) {
    return index === this.currentTab ;
  }

  onAll(){
    this.all = "tab activeTab" ;
    this.queue = "tab" ;
    this.consulting = "tab" ;
    this.cancelled = "tab" ;
    this.seen = "tab";

    this.currentTab = 0 ;
    this.listDatafiltered = this.listData;
  }

  onQueue(){
    this.all = "tab" ;
    this.queue = "tab activeTab" ;
    this.consulting = "tab" ;
    this.cancelled = "tab" ;
    this.seen = "tab";

    this.currentTab = 1 ;
    this.filterBy('Queue');
  }

  filterBy(filter) {
    this.listDatafiltered = this.listData.filter(data => data.status == filter);
  }

  onConsulting(){
    this.all = "tab" ;
    this.queue = "tab" ;
    this.consulting = "tab activeTab" ;
    this.cancelled = "tab" ;
    this.seen = "tab";

    this.currentTab = 2 ;
    this.filterBy('Consulting');
  }

  onCancelled(){
    this.all = "tab" ;
    this.queue = "tab" ;
    this.consulting = "tab" ;
    this.cancelled = "tab activeTab" ;
    this.seen = "tab";

    this.currentTab = 3;
    this.filterBy('Cancelled');
  }

  onSeen() {
    this.all = "tab" ;
    this.queue = "tab" ;
    this.consulting = "tab" ;
    this.cancelled = "tab" ;
    this.seen = "tab activeTab" ;

    this.currentTab = 4;
    this.filterBy('Seen');
  }

}
