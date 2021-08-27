import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from  './../../core/services/auth.service';
import {QueueMgmtService} from './../queue-mgmt.service';
import {DatePipe} from '@angular/common';
import {FormControl } from '@angular/forms';
import { Router  } from '@angular/router';
import * as moment from  'moment';
import { Patient } from '../queue-mgmt.model';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/core/components/alert/alert.component';
import { AppointmentService } from 'src/app/appointment/appointment.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConsultComponent } from 'src/app/appointment/consult/consult.component';
import { ShareService } from '../../share.service' ;
import { SseService } from '../../core/services/sse.service' ;
import { environment } from '../../../environments/environment' ;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']

})
export class AdminComponent implements OnInit,OnDestroy {
  appointmentDate = new FormControl(new Date());
  allCheck = true ;
  filteredDoctor = [] ;
  queueData=[];
  docList=[];
  status='noStatus';
  cardData=[]
  appointmentDetailsList=[];
  currentDate;
  role;
  filteredData=[];
  sub1:any;
  sseSource ;
  sseUrl = environment.sseUrl ;


  constructor(private authservice:AuthService,private dialog: MatDialog,private appointmentService: AppointmentService,private notification: NotificationService,
    private queuemgmtservice:QueueMgmtService,private datepipe:DatePipe,private router:Router, private shareService: ShareService,
    private sse: SseService) {
  }

  ngOnInit() {
    this.role = localStorage.getItem('roles');
    let date = this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd');
    this.currentDate = date;
    this.queuemgmtservice.setAppointmentDate(date);
    this.queuemgmtservice.dateChangeEvent.next(date);

    this.getClinicDetails(this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd'));
    this.sseConnection(date) ;

  }

  sseConnection(date){
    const token = localStorage.getItem('token') ;
    const header = {
      'X-Clinic-ID' : localStorage.getItem('clinicId'),
      'X-Date' : date,
      'X-Request-Origin': localStorage.getItem('roles'),
      'X-Reception-ID' : localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      Authorization : `Bearer ${token}`
    };
    this.sseSource = this.sse.getEventSource(`${this.sseUrl}q/stream`, header) ;

    this.sseSource.addEventListener('message', message => {
      if(message.data.length){
        let data = JSON.parse(message.data) ;
        this.getNewPatients(data, date) ;
      }
    });

    this.sseSource.onerror = err => {
      this.sseSource.close() ;
      this.sseSource = null ;
      this.getClinicDetails(this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd'));
      console.log(err) ;
    }
  }

  queueStatusUpdate(event, index){
    console.log(event.checked) ;
    const obj = {
      "Content-Type" : "application/json",
      "X-Request-Origin" : localStorage.getItem("roles") ? localStorage.getItem("roles") : "admin",
      "customer_id" : localStorage.getItem('clinicId'),
      "consumer_id" : this.cardData[index].id,
      "queue_date" : this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd'),
      "queue_status" : event.checked ? "ACTIVE" : "STOP"
    }
    const objStr = JSON.stringify(obj) ;
    this.queuemgmtservice.updateQueueStatus(this.cardData[index].id, objStr).subscribe(result => {
      console.log(result) ;
      this.cardData[index].queueStatus = event.checked ;
    }, err => console.log(err)) ;
  }

  getNewPatients(data, date){
    console.log(data) ;
    let doctorIds = {} ;
    let doctorIdArr = [] ;
    let queueStatus = {} ;
    let counter = 0 ;

    for(let appointment of data){
      if(!doctorIds.hasOwnProperty(appointment.consumer_id)){
        const customer = appointment.consumer_id ;
        doctorIds = {...doctorIds, [customer] : [] } ;
        doctorIdArr.push(appointment.consumer_id) ;
        queueStatus = {...queueStatus, [customer] : appointment.queue_status === "ACTIVE" ? true : false} ;
      }
    }

    this.updateQueueStatus(queueStatus) ;

    console.log(doctorIds, doctorIdArr) ;

    if(!this.appointmentDetailsList.length){
      this.getClinicDetails(this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd'));
    }
    else{
      doctorIdArr.forEach(doctorId => {
         this.queuemgmtservice.readAppointmentDetailsByDoctor(this.queuemgmtservice.getDoctorHeader(doctorId, date)).subscribe(data => {
          const rawAppointmentData = atob(data.Data);
          if(rawAppointmentData){
            const  parseAppointmentRawData = JSON.parse(rawAppointmentData);
            let tempPatientList=[];

             parseAppointmentRawData.forEach(patientRecord=>{
              const Age = moment().diff(moment(patientRecord.patient_dob, 'YYYY-MM-DD'), 'years');
              tempPatientList.push({
                name : patientRecord.patient_name,
                gender : patientRecord.patient_sex,
                appointmentTime : this.datepipe.transform(patientRecord.check_in_time,'h:mm a'),
                tokenNo : 0,
                appointmentdate : this.datepipe.transform(patientRecord.appointment_date,'d MMM'),
                mode : patientRecord.appointment_type,
                status : patientRecord.state_appointment,
                contactNo : patientRecord.phone,
                age : Age,
                appointment_id : patientRecord._id,
                vitals : patientRecord.patient_vital,
                patient_id : patientRecord.patient_id
              });
            });
             console.log("tempPatient", tempPatientList) ;

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
            let j = 0;
            for(i=0;i<tempPatientList.length;i++){
              tempPatientList[i].tokenNo = j+1;
              j++;
            }

            doctorIds[doctorId] = tempPatientList ;
            counter++ ;
          }
          console.log(counter, doctorIdArr.length) ;


          if(counter == doctorIdArr.length){
            for(let i=0; i<this.appointmentDetailsList.length; i++){
              if(doctorIds.hasOwnProperty(this.appointmentDetailsList[i].id)){
                this.appointmentDetailsList[i].patients = doctorIds[this.appointmentDetailsList[i].id] ;
                this.appointmentDetailsList[i].unfilteredPatients = doctorIds[this.appointmentDetailsList[i].id] ;
              }
            }
            console.log(this.appointmentDetailsList) ;
            this.queueData = [...this.appointmentDetailsList];
            if(this.status !== 'noStatus' || this.allCheck !== true){
              this.maintainFilterOnsubscribe(this.appointmentDetailsList);
            }
            else{
              this.cardData = [...this.appointmentDetailsList];
            }
          }
        }, err => console.log(err))
      });
    }
  }

  updateQueueStatus(queueStatus){
    for(let i=0;  i<this.cardData.length; i++){
      if(queueStatus.hasOwnProperty(this.cardData[i].id)){
        this.cardData[i].queueStatus = queueStatus[this.cardData[i].id] ;
      }
    }

    for(let i=0;  i<this.appointmentDetailsList.length; i++){
      if(queueStatus.hasOwnProperty(this.appointmentDetailsList[i].id)){
        this.appointmentDetailsList[i].queueStatus = queueStatus[this.appointmentDetailsList[i].id] ;
      }
    }
  }

  reload() {
    this.updateData();
  }

  getClinicDetails(date){
      this.cardData = []
      let today=this.datepipe.transform(new Date(),'yyyy-MM-dd')
      let role = localStorage.getItem('roles') ;

      if(role === 'reception'){
         this.authservice.readClinicDetails().subscribe((data: any) => {
          if (data) {
            const clinicData = atob(data.Data);
            this.shareService.updateClinicData(JSON.parse(clinicData)) ;
            const doctorDet = JSON.parse(clinicData).doctors;
            this.docList = this.getActiveDoctorList(doctorDet);
            this.filteredDoctor = this.docList.map((doctor)=>{
              return {'doctor_name':doctor.doctor_name,'selected':false}
            });
            this.getPatientRecords(this.docList,date);
              if(date>=today && !this.sseSource){
                this.subscribeService(this.docList,date);
              }
            }
          }, (error) => {});
      }
      else{
        this.shareService.clinicData.subscribe(data => {
          if(Object.keys(data).length != 0){
            const clinicData = data ;
            const doctorDet = clinicData.doctors ;
            this.docList = this.getActiveDoctorList(doctorDet);
            this.filteredDoctor = this.docList.map((doctor)=>{
              return {'doctor_name':doctor.doctor_name,'selected':false}
            });
            this.getPatientRecords(this.docList,date);
            if(date>=today && !this.sseSource){
              this.subscribeService(this.docList,date);
            }
          }
        }, err => console.log(err)) ;
      }
    }


  getActiveDoctorList(doctorDet){
    if(doctorDet){
      let doctorList= doctorDet.filter(doctor=>{
          return doctor.employment_status=='a';
      }).map((doctor)=>{
        return {'doctor_id' : doctor.doctor_id,'doctor_name' :doctor.doctor_name}
      })
      return doctorList

    }
  }


  getPatientRecords(doctorList,date){

    if(this.sseSource){
      if(this.sub1){
        clearInterval(this.sub1);
      }
    }

     this.appointmentDetailsList=[];
     doctorList.forEach((doctor)=>{
       this.queuemgmtservice.readAppointmentDetailsByDoctor(this.queuemgmtservice.getDoctorHeader(doctor.doctor_id,date)).
       subscribe((data)=>{
        const rawAppointmentData = atob(data.Data);
        if(rawAppointmentData){
          const  parseAppointmentRawData = JSON.parse(rawAppointmentData);
          let tempPatientList=[];
          parseAppointmentRawData.forEach(patientRecord=>{
            const Age = moment().diff(moment(patientRecord.patient_dob, 'YYYY-MM-DD'), 'years');
            tempPatientList.push({
              name:patientRecord.patient_name,
              gender:patientRecord.patient_sex,
              appointmentTime:this.datepipe.transform(patientRecord.check_in_time,'h:mm a'),
              tokenNo:0,appointmentdate:this.datepipe.transform(patientRecord.appointment_date,'d MMM'),
              mode:patientRecord.appointment_type,
              status:patientRecord.state_appointment,
              contactNo:patientRecord.phone,
              age:Age,
              appointment_id:patientRecord._id,
              vitals: patientRecord.patient_vital,
              patient_id: patientRecord.patient_id
            });
          });
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
            let j = 0;
            for(i=0;i<tempPatientList.length;i++){
                tempPatientList[i].tokenNo = j+1;
                j++;

            }
          this.appointmentDetailsList.push({title:doctor.doctor_name,id:doctor.doctor_id,
          patients:tempPatientList,unfilteredPatients:tempPatientList, queueStatus: false});
          }
          else {
            this.appointmentDetailsList.push({title:doctor.doctor_name,id:doctor.doctor_id,
              patients:[],unfilteredPatients:[], queueStatus : false});
          }
          if(this.appointmentDetailsList.length == this.docList.length){
            this.queueData = [...this.appointmentDetailsList];
            if(this.status !== 'noStatus' || this.allCheck !== true){
              this.maintainFilterOnsubscribe(this.appointmentDetailsList);
            }
            else{
              this.cardData = [...this.appointmentDetailsList];
            }
          }
        }
      ,error=>{});//readDetailsByDoctorList end
      });//doctorList Foreach close


  }


  /* filters all the doctors according to status ie seen,queue,cancelled and with-doctor */
  filterForAll(status) {
    if(this.status!=status){
      this.status=status;
    }
    this.cardData.forEach((doctor, index) => {
      this.cardData[index]['patients'] = doctor.unfilteredPatients && doctor.unfilteredPatients.filter(patient => patient.status == status);
    });
  }


  /* filters individual doctor  according to status ie seen,queue,cancelled and with-doctor */
  filter(status, index) {
    this.cardData[index]['patients'] = this.cardData[index]['unfilteredPatients'].filter(patient => patient.status == status);
  }


  /* Changes the cardData on date change */
  updateData(){
    if (this.sub1) {
      clearInterval(this.sub1);
    }

    if(this.sseSource){
      this.sseSource.close() ;
    }

    this.currentDate=this.datepipe.transform(this.appointmentDate.value,'yyyy-MM-dd');
    this.queuemgmtservice.setAppointmentDate(this.currentDate);
    this.queuemgmtservice.dateChangeEvent.next(this.currentDate);

    this.getClinicDetails(this.currentDate);
    this.sseConnection(this.currentDate) ;
  }


  /* checks if any new patient has come every 7 minutes */
  subscribeService(docList,date) {
    this.sub1 = setInterval(() => {
    this.getPatientRecords(docList,date);
    },420000);
  }


  /* maintains the filter and status when subscribeService runs */
  maintainFilterOnsubscribe(appointmentDetailsList){
    if(appointmentDetailsList){
      appointmentDetailsList.forEach((doctor, index) => {
        appointmentDetailsList[index]['patients'] =doctor.unfilteredPatients && doctor.unfilteredPatients.filter(patient => patient.status == this.status);
      });
      if(this.allCheck){
        this.cardData=appointmentDetailsList;
      }
      else{
        this.filteredData=[];
        let selectedDoc=[]
        selectedDoc=this.filteredDoctor.filter((data)=>{
          return data.selected==true
        })

        if(selectedDoc.length>0){
          selectedDoc.forEach((doctor)=>{
            this.filteredData.push(appointmentDetailsList.filter(data=>{
            return data.title==doctor.doctor_name;
           })[0])
           this.cardData = this.filteredData;
          })
        }
        else{
          this.allCheck=true;

          this.cardData=appointmentDetailsList;
        }
      }
    }
  }


  /* filters all the doctor ie to select and unselect all the doctors */
  selectAll(event){
    this.filteredDoctor = this.filteredDoctor.map((doctor)=>{
      doctor.selected = false;
      return doctor
    })
    this.allCheck = event.target.checked
      if(this.allCheck){
        this.cardData = [...this.queueData] ;
      }
    else{
      this.cardData = [] ;
      }
    }



  /* filter individual doctor */
  checkThisDoctor(event,i){
    this.filteredDoctor[i].selected=event.target.checked;
    let selectedDoc=[]
    this.filteredData=[];
    selectedDoc=this.filteredDoctor.filter((data)=>{
      return data.selected==true
    })
    selectedDoc.forEach((doctor)=>{
      this.filteredData.push(this.queueData.filter(data=>{
        return data.title==doctor.doctor_name;
     })[0])
    })
    this.cardData = this.filteredData;
    this.allCheck = this.queueData.length === selectedDoc.length;
    if(this.queueData.length === selectedDoc.length)
    { setTimeout(()=>{
      this.filteredDoctor=this.filteredDoctor.map((doctor)=>{
        doctor.selected=false;
        return doctor
      })
    },5)

    }
  }


  loadIndividualDet(data) {
    localStorage.setItem('doctorName',data.title);
    localStorage.setItem('doctorId',data.id);
    this.router.navigate(['/queuemgmt/doctor',data.title]);
  }

  onDrop(event: CdkDragDrop<Patient[]>) {
    console.log(event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onCancelAppointment(pdata, ev) {
    ev.stopPropagation();
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
          _id: pdata.appointment_id,
          patient_id: pdata.patient_id,
          clinic_id: localStorage.getItem('clinicId')
        };
        this.appointmentService.appointmentCreate(data, 'patch').subscribe(data => {
          if (data) {
            this.notification.show('Appointment Cancelled', 'Ok', 8000);
            this.reload();
          }
        },
        error => console.log('Appointment Cancellation error', error));
      } else {
      }
    });
  }

  onClickVitals(data) {
    if(this.role === 'doctor'){
      localStorage.setItem('appointment_id' , data.appointment_id) ;
      localStorage.setItem('patient_id' , data.patient_id) ;
      this.router.navigate(['/prescription']) ;
    }
    else{
      const dialogRef = this.dialog.open(ConsultComponent , {
        width : '1600px',
        height : '95vh',
        data : data
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result) ;
      }, error => console.log(error));
    }
  }




  onBookAppointment(){
    this.router.navigate(['/appointment/bookappointment']);
  }


  drop(event: CdkDragDrop<{ title: string, poster: string }[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }


  ngOnDestroy() {
    if(this.sub1) {
      clearInterval(this.sub1);
    }

    if(this.sseSource){
      this.sseSource.close() ;
    }
  }

}
