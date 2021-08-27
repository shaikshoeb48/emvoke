import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ShareService } from  './../share.service';
import { AuthService } from '../core/services/auth.service' ;


import { QueueMgmt } from './queue-mgmt.model';

const INIT_DATA =[];
@Injectable()
export class QueueMgmtService {
  doctorDetailsList=[];
  appointmentDetailsList=[];
  queueData: QueueMgmt[] = [];
  appointmentDate;
  serverUrl = `${environment.baseUrl}${environment.baseParameter}`;
  sseUrl = `${environment.sseUrl}` ;
  doctorName: any;
  dateChangeEvent = new BehaviorSubject<any>(INIT_DATA);
  datechange$ = this.dateChangeEvent.asObservable();
  constructor(private http:HttpClient, private datepipe:DatePipe, private shareService: ShareService, private authservice: AuthService) {
  }

  getFilterDate() {
    return this.dateChangeEvent;
  }

  

  getStatusColor(status: string) {
    switch (status) {
      case 'With-Doctor':
        return 'btn-purple';
      case 'Seen':
        return 'btn-green';
      case 'Queue':
        return 'btn-blue';
      case 'Cancelled':
        return 'btn-orange';
      default:
        return '';
    }
  }
  readAppointmentDetailsByDoctor(header):Observable<any>{
   return this.http.get<any>(`${this.serverUrl}/appointment/per-doctor`, { headers: header });
 }
 setAppointmentDate(date){
   this.appointmentDate=date;
 }
 getAppointmentDate(){
   return this.appointmentDate;
 }
 setDoctorName(name){
   this.doctorName=name;
 }
 getDoctorName(){
   return this.doctorName;
 }

 getDoctorHeader(doctorId,date) {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Clinic-ID': localStorage.getItem('clinicId'),
    'X-Doctor-ID': doctorId,
    'X-Date'     : date,
    'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
    Authorization: `Bearer ${token}`
  });
}

queueStatusHeader(doctorId){
  const token = localStorage.getItem('token') ;
  return new HttpHeaders({
    'X-Clinic-ID' : localStorage.getItem('clinicId'),
    'X-Doctor-ID' : doctorId,
    'X-Reception-ID' : localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
    Authorization : `Bearer ${token}`
  });
}


updateQueueStatus(doctorId, statusObj){
  return this.http.post<any>(`${this.sseUrl}q/update`, statusObj, {headers : this.queueStatusHeader(doctorId)}) ;
}

 /*
  getQueueDataService(date){
    this.authservice.readClinicDetails().subscribe((data:any)=>{
      if(data){
        const clinicData = atob(data.Data);
        const doctorDet = JSON.parse(clinicData).doctors;
        this.doctorDetailsList=[];
        this.appointmentDetailsList=[];
        doctorDet.forEach(doctor => {
           //check if the doctor is active
          if(doctor.employment_status === 'a'){
            this.doctorDetailsList.push({doctor_id:doctor.doctor_id,doctor_name:doctor.doctor_name});
          }

        });


        this.doctorDetailsList.forEach(doctor=>{

       this.readAppointmentDetailsByDoctor(this.getDoctorHeader(doctor.doctor_id,date)).subscribe((
        data)=>{
                const rawAppointmentData = atob(data.Data);
                if(rawAppointmentData){
                    const  parseAppointmentRawData = JSON.parse(rawAppointmentData);

                  let tempPatientList=[];
                  parseAppointmentRawData.forEach(patientRecord=>{
                    //calculate age
                    let Dob:any = new Date(patientRecord.patient_dob);
                    let today:any = new Date();
                    const timediff = Math.abs(today - Dob);
                    const Age = Math.floor((timediff / (1000 * 3600 * 24)) / 365);
                    tempPatientList.push({name:patientRecord.patient_name,gender:patientRecord.patient_sex,
                      appointmentTime:this.datepipe.transform(patientRecord.appointment_date,'h:mm a'),
                      tokenNo:0,appointmentdate:this.datepipe.transform(patientRecord.appointment_date,'d MMM'),
                        mode:patientRecord.appointment_type,status:patientRecord.state_appointment,contactNo:patientRecord.phone,age:Age,
                      appointment_id:patientRecord._id, vitals: patientRecord.patient_vital, patient_id: patientRecord.patient_id});
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
                  this.appointmentDetailsList.push({title:doctor.doctor_name,id:doctor.doctor_id,
                  patients:tempPatientList});
                  }
                  else {
                    this.appointmentDetailsList.push({title:doctor.doctor_name,id:doctor.doctor_id,
                      patients:[]});
                  }



      }
      ,error=>{});

      });




         Promise.all(this.appointmentDetailsList).then(()=>{
          this.queueData = this.appointmentDetailsList;
         });

      }

    },(error)=>{});

    } */





//  getPatData():QueueMgmt[]{
//    return this.patientData.getValue();
//  }


}





