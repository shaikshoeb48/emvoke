import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueueMgmt } from '../queue-mgmt.model';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { QueueMgmtService } from '../queue-mgmt.service';
import { Router } from '@angular/router';
import { BookAppointmentComponent } from 'src/app/appointment/book-appointment/book-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { OverlayServiceService } from 'src/app/shared/components/overlay-service.service';
import { SseService } from '../../core/services/sse.service' ;
import { environment } from '../../../environments/environment' ;


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit,OnDestroy {

  patientsData = [];
  appointmentDate=new FormControl(new Date());
  doctorId;
  doctorName;
  sub:any;
  currentDate;
  queueStatus = true ;

  sseSource ;
  sseUrl = environment.sseUrl ;

  constructor(private overlayService: OverlayServiceService,private sse: SseService, private httpService: HttpClient, private route: ActivatedRoute,private dialog: MatDialog,
    private queuemgmtService:QueueMgmtService,private datepipe:DatePipe,private router:Router) {

  }

  ngOnInit() {
    this.doctorName = localStorage.getItem('doctorName');
    this.doctorId=localStorage.getItem('doctorId');
    let date = this.queuemgmtService.getAppointmentDate();
    if(!date) {
      date  = this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd');
    }
    this.appointmentDate.setValue(date);
    this.queuemgmtService.dateChangeEvent.next(date)
    this.getAppointmentDetails(date);
    this.currentDate=date;
    // this.subscribeService();
    this.sseConnection(date) ;
  }

  sseConnection(date){
    const token = localStorage.getItem('token');
    const header = {
      'X-Doctor-ID' : this.doctorId,
      'X-Clinic-ID' : localStorage.getItem('clinicId'),
      'X-Request-Origin': localStorage.getItem('roles'),
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      'X-Date'     : date,
      Authorization: `Bearer ${token}`
    };

    this.sseSource = this.sse.getEventSource(`${this.sseUrl}q/stream`, header) ;
    this.sseSource.addEventListener('message', message => {
      console.log(message) ;
      if(message.data){
        let data = JSON.parse(message.data) ;
        console.log(data) ;

        if(data.length){
          for(let queueUpdate of data){
            if(queueUpdate.message){
              console.log(queueUpdate.message) ;
              this.getAppointmentDetails(date) ;
              break ;
            }
          }

          for(let queueUpdate of data){
            this.queueStatus = queueUpdate.queue_status === "ACTIVE" ? true : false ;
          }
        }
      }
    });

    this.sseSource.onerror = err => {
      this.sseSource.close() ;
      this.sseSource = null ;
      this.subscribeService() ;
      console.log(err) ;
    };
  }

  queueStatusChange(event){
    console.log(event.checked) ;
    const obj = {
      "Content-Type" : "application/json",
      "X-Request-Origin" : localStorage.getItem("roles") ? localStorage.getItem("roles") : "admin",
      "customer_id" : localStorage.getItem('clinicId'),
      "consumer_id" : this.doctorId,
      "queue_date" : this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd'),
      "queue_status" : event.checked ? "ACTIVE" : "STOP"
    }
    const objStr = JSON.stringify(obj) ;
    this.queuemgmtService.updateQueueStatus(this.doctorId, objStr).subscribe(result => {
      console.log(result) ;
      this.queueStatus = event.checked ;
    }, err => console.log(err)) ;
  }


  getDoctorHeader(date) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': this.doctorId,
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      'X-Date'     : date,
      Authorization: `Bearer ${token}`
    });
  }

  reload(ev) {
    this.getAppointmentDetails(ev);
  }


  getAppointmentDetails(date){
    this.queuemgmtService.readAppointmentDetailsByDoctor(this.getDoctorHeader(date)).subscribe(
      (data)=>{
                const rawAppointmentData = atob(data.Data);
                if(rawAppointmentData){
                  const parseAppointmentData = JSON.parse(rawAppointmentData);
                  let tempPatientList=[];
                  parseAppointmentData.forEach(patientRecord=>{
                        //calculate age
                        let Dob:any = new Date(patientRecord.patient_dob);
                        let today:any = new Date();
                        const timediff = Math.abs(today - Dob);
                        const Age = Math.floor((timediff / (1000 * 3600 * 24)) / 365);
                      tempPatientList.push({tokenNo:0,name:patientRecord.patient_name,gender:  patientRecord.patient_sex,
                        appointmentTime:this.datepipe.transform(patientRecord.check_in_time,'h:mm a'),
                        unfilteredAppointmentTime:patientRecord.check_in_time,
                        age:Age,appointmentdate:this.datepipe.transform(patientRecord.appointment_date,'d MMM'),
                        date: patientRecord.appointment_date,
                        mode:patientRecord.appointment_type,contactNo:patientRecord.phone,status:patientRecord.state_appointment,
                        appointment_id:patientRecord._id, vitals: patientRecord.patient_vital, patient_id: patientRecord.patient_id });

                  });
                      // calculate  Token No
                    tempPatientList.sort(function (a, b) {
                      a = a.appointmentTime;
                      b = b.appointmentTime;
                      if (a < b) {
                        return -1;
                      } else if (a > b) {
                        return 1;
                      }
                      return 0;
                    });
                      //TokenAssignment
                      let i=0;
                      for(i=0;i<tempPatientList.length;i++){

                          tempPatientList[i].tokenNo = i+1;
                      }
                    this.patientsData = tempPatientList;
                }
                else {
                      this.patientsData = [];
                }

      },error=> {}
    );

  }
/* getPatientData(id: string) {
    this.httpService.get('http://localhost:4200/assets/queuedata.json').subscribe((data: QueueMgmt[]) => {
      this.patientsData = data.filter((res) => res.id === id)[0].patients;
    });
  } */

  onBookAppointment() {
    if(this.sseSource){
      this.sseSource.close() ;
    }
    this.router.navigate(['/appointment/bookappointment']);
  }

  onBack(){
    if(this.sseSource)
      this.sseSource.close() ;

    this.router.navigate(['queuemgmt']);
  }

  subscribeService() {
    this.sub=setInterval(() => {
      this.getAppointmentDetails(this.currentDate);
    }, 420000);
  }

  onDateChange(){
    if(this.sub){
      clearInterval(this.sub);
    }
    if(this.appointmentDate.value==null){
        this.appointmentDate.setValue(this.currentDate);
     }
    let date = this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd');
    let today = this.datepipe.transform(new Date(),'yyyy-MM-dd');
    this.getAppointmentDetails(date);
    this.currentDate = date;
    this.queuemgmtService.dateChangeEvent.next(this.currentDate) ;

    if(this.sseSource){
      this.sseSource.close() ;
    }

    this.sseConnection(date) ;

    if(date >= today && !this.sseSource){
      this.subscribeService();
    }


  }
  ngOnDestroy(){
    if(this.sub){
      clearInterval(this.sub);
    }

    if(this.sseSource){
      this.sseSource.close() ;
    }

  }


  // ngAfterViewInit() {
  //   this.overlayService.showOverlay(3);
  // }


}
