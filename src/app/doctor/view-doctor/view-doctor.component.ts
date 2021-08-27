import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, Optional, ViewChild, ElementRef , OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './../../core/services/auth.service';
import { NotificationService } from './../../core/services/notification.service';
import { AlertComponent } from './../../core/components/alert/alert.component';
import { FormControl } from '@angular/forms';
import { ShareService } from '../../share.service' ;

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.scss']
})
export class ViewDoctorComponent implements OnInit , OnDestroy {

 
  exportTime = { hour: 12, minute: 15 , meriden: 'PM', format: 12, time : '12:00 am' };
  isActive = true;
  doctorData;
  selectedMenu = "gen" ;
  doctorTimings ;
  allClinicData ;
  role = localStorage.getItem('roles') ;

  activeday = 'SUN';
  modes = ['Online', 'Offline'];
  est = 15 ;
  estMsg = "" ;
  offlineFee  ;
  onlineFee  ;

  Leaves = ['Casual Leave', 'Sick Leave'];
  leaveObj: any = {
    leave : 'Casual Leave',
    start_date : (new Date()).toISOString() ,
    end_date : (new Date()).toISOString() ,
    remark : ''
  } 
  savedLeaves = [];

  specialTimingsObj: any = {
    start : {...this.exportTime},
    end : {...this.exportTime} ,
    mode : 'Online',
    date : '',
    reason : '',
    remarks : ''
  }
  savedSpecialTimings = [] ; 
 
  days = [
    {
      "short_name": "SUN",
      "long_name": "SUNDAY",
      "day": 0,
      "noOfSch" : 0
    },
    {
      "short_name": "MON",
      "long_name": "MONDAY",
      "day": 1,
      "noOfSch" : 0
    },
    {
      "short_name": "TUE",
      "long_name": "TUESDAY",
      "day": 2,
      "noOfSch" : 0
    },
    {
      "short_name": "WED",
      "long_name": "WEDNESDAY",
      "day": 3,
      "noOfSch" : 0
    },
    {
      "short_name": "THU",
      "long_name": "THURSDAY",
      "day": 4,
      "noOfSch" : 0
    },
    {
      "short_name": "FRI",
      "long_name": "FRIDAY",
      "day": 5,
      "noOfSch" : 0
    },
    {
      "short_name": "SAT",
      "long_name": "SATURDAY",
      "day": 6,
      "noOfSch" : 0
    }];

  customizeObj = {
      7 : false,
      0 : false,
      1 : false,
      2 : false,
      3 : false,
      4 : false,
      5 : false,
      6 : false
  }  
  customizeOption = [{...this.customizeObj}] ;
  day = 0;
  
 
  tempSlots = [] ;  // TEMP FOR CONVERSION AND FOR DIAPLAY
  timings = [] ;    // FOR BACKEND


  constructor(private authService: AuthService, private notification: NotificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any, public dialogRef: MatDialogRef<ViewDoctorComponent>,
    private dialog: MatDialog, private shareService: ShareService) { }

  async ngOnInit() {
    if (this.dialogData) {
      const subs  = this.authService.readDoctorDetails(this.dialogData.doctorId);
      if (subs) {
        (await subs).subscribe((data: any) => {
      // this.authService.readDoctorDetails(this.dialogData.doctorId).subscribe((data: any) => {
        if (data) {
          this.doctorData = JSON.parse(atob(data.Data));
          console.log(this.doctorData)
          this.isActive = this.dialogData.status == "active" ? true : false;
        }
      }, (error) => console.log(error));
    }
      this.shareService.clinicData.subscribe(data => {
        this.allClinicData = data ;
        console.log(data);
        for(let doctor of data.doctors){
          if(doctor.employment_status !== 'released' && doctor.doctor_id === this.dialogData.doctorId){
            const obj = {
              est : doctor.estimated_time_per_appointment ? doctor.estimated_time_per_appointment : 15 ,
              timings : doctor.timings,
              special_timings : doctor.special_timings,
              holidays : doctor.holidays
            }
            this.est = obj.est ;
            this.doctorTimings = {...obj} ;
            this.onlineFee = doctor.consultation_charges_online ;
            this.offlineFee = doctor.consultation_charges_offline ;
            console.log(this.onlineFee);
            break ;
          }
        }
        this.createTimings();
        this.createSpecialTimings()
      });
    }
  }


  createTimings(){
    if(this.doctorTimings){
      for(let timing of this.doctorTimings.timings){
        this.timings.push(timing) ;
        this.customizeOption.push({...this.customizeObj}) ;

        const mode = timing.mode ;
        const day = timing.day ;
        this.days[day].noOfSch += 1 ;
        const timeValue = this.createActualTime(timing.time) ;

        const obj = {
          day ,
          mode ,
          start : timeValue.start ,
          end : timeValue.end ,
          saved: true
        }
        this.tempSlots.push(obj) ;
      }
    }
  }

  createActualTime(milTime): any{
    let start = { hour: 0 , minute: 0, meriden: '', time : '', format: 12 } ;
    let end = { hour: 0, minute: 0, meriden: '', time : '', format: 12 } ;

    let startHour = milTime[0] + milTime[1] ;
    let startMin = milTime[2] + milTime[3] ;

    let endHour = milTime[5] + milTime[6] ;
    let endMin = milTime[7] + milTime[8] ;

    startHour = + startHour ;
    startMin = +startMin ;
    endHour = +endHour;
    endMin = +endMin ;

    let startMed = "AM" ;
    let endMed = "AM" ;

    // FOR START HOUR CHANGE
    if(startHour > 12){
      startHour = startHour % 12 ;
      startMed = "PM" ;
    }
    else if(startHour == 12){
      startMed = "PM" ;
    }
    else if(startHour == 0){
      startHour = 12 ;
    }

    // FOR END HOUR CHANGE
    if(endHour > 12){
      endHour = endHour % 12 ;
      endMed = "PM" ;
    }
    else if(endHour == 12){
      endMed = "PM" ;
    }
    else if(endHour == 0){
      endHour = 12 ;
    }

    start.hour = startHour ;
    start.minute = startMin ;
    start.meriden = startMed ;

    end.hour = endHour ;
    end.minute = endMin ;
    end.meriden = endMed ;

    start.time = startHour.toString() + ':' ;
    if(startHour < 10){
      start.time = '0' + start.time ;
    }
    if(startMin < 10){
      start.time = start.time + '0' ;
    }
    start.time = start.time + startMin.toString() + ' ' ;

    start.time = start.time + startMed.toLowerCase() ;


    end.time = endHour.toString() + ':' ;
    if(endHour < 10){
      end.time = '0' + end.time ;
    }
    if(endMin < 10){
      end.time = end.time + '0' ;
    }
    end.time = end.time + endMin.toString() + ' ' ;

    end.time = end.time + endMed.toLowerCase() ;

    return {start , end} ;
  }

  public switchView(value) {
   this.selectedMenu = value ;
  }


  //  ###### SCHEDULING LOGIC ##########

  selectDay(day) {
    this.day = day.day;
    this.activeday = day.short_name;
  }

  setFee(value, type){
    if((+value) && typeof(+value) == typeof(5.5)){
      if(type == "online"){
        this.onlineFee = +value ;
        const obj = {
          consultation_charges_online : this.onlineFee
        }
        this.updateDoctorDetails(obj , "Online Consultation Fee Updated") ;
      }
      else{
        this.offlineFee = +value ;
         const obj = {
          consultation_charges_offline : this.offlineFee
        }
        this.updateDoctorDetails(obj , "Offline Consultation Fee Updated") ;
      }
    }
    else{
      this.notification.show("Please enter Numbers", "ok", 6000) ;
    }
  }

  selectMode(mode, index) {
      this.tempSlots[index].mode = mode;
      this.tempSlots[index].saved = false ;
  }

  submitTime(type, eventString, index){

    const mer = eventString[6] + eventString[7] ;

    const event = {
      hour : eventString[0] + eventString[1] ,
      minute : eventString[3] + eventString[4],
      meriden : mer === "am" ? 'AM' : 'PM',
      time : eventString,
      format : 12
    }

    this.tempSlots[index].saved = false ;

    if(type === 'start'){
      this.tempSlots[index].start = {... event} ;
    }
    else{
      this.tempSlots[index].end = {... event} ;
    }

    console.log(event);
  }

  setEST(value){

    if((+value) && typeof(+value) == typeof(5)){
      if(value > 0 && value < 61){
        this.est = value ;
        this.estMsg = "" ;
        const obj = {
          estimated_time_per_appointment : this.est 
        }
        this.updateDoctorDetails(obj , "Slot Duration Updated") ;
      }
      else{
        this.estMsg = "Choose between 0 to 60" ;
      }
    }
    else{
      this.estMsg = "Choose a Number from 0-60"
    }
  }


  repeatSlot(day , index){
    this.customizeOption[index][day] = true ;
  }

  saveRepeatSlots(index , timings){
    if(this.customizeOption[index][7] !== true){
      for(let i=0 ; i<7 ; i++){
        if(this.customizeOption[index][i] && i != this.day){
          let obj = {...timings} ;
          obj.day = i ;
          this.timings.push(obj) ;
          let slotObj = {...this.tempSlots[index]} ;
          slotObj.day = i ;
          slotObj.saved = true ;
          this.tempSlots.push(slotObj) ;
          this.days[i].noOfSch += 1 ;
          this.customizeOption.push({...this.customizeObj}) ;
        }
      }
    }
    else{
       for(let i=0 ; i<7 ; i++){
         if(i !== this.day){
            let obj = {...timings} ;
            obj.day = i ;
            this.timings.push(obj) ;
            let slotObj = {...this.tempSlots[index]} ;
            slotObj.day = i ;
            slotObj.saved = true ;
            this.tempSlots.push(slotObj) ;
            this.days[i].noOfSch += 1 ;
            this.customizeOption.push({...this.customizeObj}) ;
          }
      }
    }
  }

  compareTimings(time){
    let start = time[0] + time[1] + time[2] + time[3] ;
    let end = time[5] + time[6] + time[7] + time[8] ;

    start = +start ;
    end = +end ;

    return (end > start) ;
  }

  saveSlot(index){
    let day = this.day ;
    let mode = this.tempSlots[index].mode ;

    let start = this.tempSlots[index].start ;
    let end = this.tempSlots[index].end ;

    let time = this.createMilTime(start, end) ;

    const isValidTime = this.compareTimings(time) ;

    if(!isValidTime){
      this.notification.show("Invalid Timings", "Ok", 6000) ;
      return ;
    }

    const obj = {
      day ,
      mode ,
      time
    }

    this.timings.splice(index , 1 , obj) ;
    this.days[day].noOfSch += 1 ;
    this.saveRepeatSlots(index , obj) ;
    
    const final = {
      timings : this.timings
    }
    const result = this.updateDoctorDetails(final, "Timings Saved") ;
    if(result){
      this.tempSlots[index].saved = true ;
    }
  }

  createMilTime(start, end){
    let startHour: any = +start.hour ;
    let startMin: any = +start.minute ;
    let startMed = start.meriden ;

    let endHour: any = +end.hour ;
    let endMin: any = +end.minute ;
    let endMed = end.meriden ;

    // CHANGE START MIN
    if(startMin < 10){
      startMin = startMin.toString() ;
      startMin = '0' + startMin ;
    }

    // CHANGE END MIN
    if(endMin < 10){
      endMin = endMin.toString() ;
      endMin = '0' + endMin ;
    }

    // CHANGE HOUR FOR START TIME
    if(startMed === "AM"){
      if(startHour === 12){
        startHour = 0 ;
      }
      if(startHour < 10)
        startHour = '0' + startHour.toString() ;
      else
        startHour = startHour.toString() ;
    }

    else{
      if(startHour < 12){
        startHour += 12 ;
      }

      startHour = startHour.toString() ;
    }

    // CHANGE HOUR FOR END TIME
    if(endMed === "AM"){
      if(endHour === 12){
        endHour = 0 ;
      }
      if(endHour < 10)
        endHour = '0' + endHour.toString() ;
      else
        endHour = endHour.toString() ;
    }

    else{
      if(endHour < 12){
        endHour += 12 ;
      }

      endHour = endHour.toString() ;
    }

    let time = startHour + startMin + '-' + endHour + endMin ;
   
    return time ;
  }


  addSlot() {
    this.tempSlots.push({
      day : this.day,
      mode : 'Online',
      start : { hour : 12 , minute: 0 , meriden : 'PM', format: 12 , time : '12:00 am' } , 
      end : { hour : 12 , minute: 0 , meriden : 'PM', format: 12, time : '12:00 am' },
      saved : false
     }) ;
    this.days[this.day].noOfSch++ ;
    this.customizeOption.push({...this.customizeObj}) ;
    this.timings.push({}) ;
  }

  deleteSlot(index) {
    if(this.tempSlots.length > 0){
      this.tempSlots.splice(index , 1);
      this.timings.splice(index , 1) ;  
      this.customizeOption.splice(index,1) ;
      this.days[this.day].noOfSch -= 1 ;

      let finalTimings = [] ;
      for(let i=0; i<this.tempSlots.length; i++){
        if(this.tempSlots[i].saved){
          finalTimings.push(this.timings[i]) ;
        }
      }

      const final = {
        timings : finalTimings
      }
      this.updateDoctorDetails(final, "Timings Deleted") ;
    }
  }



  // ###### SCHEDULING LOGIC ENDS #########



//  #### DOCTOR OUT OF OFFICE LOGIC  ######

  setLeaveOption(value , type){
    this.leaveObj[type] = value ;
    console.log(this.leaveObj);
  }


  saveLeave(){
    const leave = this.leaveObj.leave ;
    const remark = this.leaveObj.remark ;
    let start_date = this.leaveObj.start_date ;
    let end_date = this.leaveObj.end_date ;

    if(new Date(start_date) < new Date()){
      this.notification.show("Please Enter Valid Date", "Ok" , 8000) ;
      return ;
    }

    if(start_date > end_date){
      this.notification.show("Please Enter Valid Date Duration" , "Ok" , 8000) ;
      return ;
    }

    this.savedLeaves.unshift({...this.leaveObj}) ;

    this.leaveObj.leave = "Casual Leave" ;
    this.leaveObj.remark = "" ;
    this.leaveObj.start_date = new Date() ;
    this.leaveObj.end_date = new Date() ;

    start_date = new Date(start_date) ;
    end_date = new Date(end_date) ;

    let tempLeaves = [] ;
    let d = start_date ;
    while(d <= end_date){
      let curDate = new Date(d) ;
      tempLeaves.unshift({
         name : `${leave}: ${remark}` ,
         date : curDate
      }) ;
     
      d.setDate(d.getDate() + 1);
    }

    console.log(tempLeaves);
    let toDeleteLeaves = [] ;
    let finalLeaves = []

    for(let i=0; i < tempLeaves.length; i++){
      for(let leave of this.doctorTimings.holidays){
        if(new Date(leave.date).toDateString() === new Date(tempLeaves[i].date).toDateString()){
          toDeleteLeaves.unshift(tempLeaves[i]) ;
        }
      }
    }

    console.log(toDeleteLeaves);

    for(let i of tempLeaves){
      let add = true ;
      for(let j of toDeleteLeaves){
        if(new Date(i.date).toDateString() == new Date(j.date).toDateString()){
          add = false  ;
          break ;
        }
      }
      if(add)
        finalLeaves.push(i);
    }

    console.log(finalLeaves) ;
   
    this.doctorTimings.holidays.unshift(...finalLeaves) ;
    console.log(this.doctorTimings.holidays);

    const final = {
      holidays : [...finalLeaves] 
    } 
    this.updateDoctorDetails(final , "Leaves Saved");
  }


// ###### DOCTOR OUT OF OFFICE ENDS  ##########





// ###### SPECIAL TIMINGS LOGIC ########

setSpecialOption(value, type){

  if(type === 'start' || type === 'end'){
      const mer = value[6] + value[7] ;

      const event = {
        hour : value[0] + value[1] ,
        minute : value[3] + value[4],
        meriden : mer === "am" ? 'AM' : 'PM',
        time : value,
        format : 12
      }

      this.specialTimingsObj[type] = {...event} ;
  }
  else{
     this.specialTimingsObj[type] = value ;
  }

  console.log(this.specialTimingsObj) ;
}

createSpecialTimings(){
  for(let timing of this.doctorTimings.special_timings){
    if(new Date(timing.date) >= new Date()){
      const time = this.createActualTime(timing.time) ;

      const start = time.start ;
      const end = time.end ;
      const date = timing.date ;
      const reason = timing.reason ;
      const remarks = timing.remarks ;
      const mode = timing.mode ;

      const obj = {
        start ,
        end ,
        date ,
        time : time.time,
        reason,
        remarks,
        mode
      }

      this.savedSpecialTimings.push({...obj}) ;
    }
  }
}

saveSpecialTimings(){
  const start = this.specialTimingsObj.start ;
  const end = this.specialTimingsObj.end ;
  const date = this.specialTimingsObj.date ;
  const mode = this.specialTimingsObj.mode ;
  const remarks = this.specialTimingsObj.remarks ;
  const reason = this.specialTimingsObj.reason ;

  const time = this.createMilTime(start , end) ;
  const isValid = this.compareTimings(time) ;

  if(!isValid){
    this.notification.show("Please Select Valid Timings", "Ok", 8000) ;
    return ;
  }

  if(!date){
    this.notification.show("Please Enter Date", "Ok", 8000) ;
    return ;
  }

  if(new Date(date) < new Date()){
    this.notification.show("Please Select a Valid Date", "Ok" , 8000) ;
    return ;
  }

  this.savedSpecialTimings.unshift({...this.specialTimingsObj}) ;

  this.specialTimingsObj.start = {...this.exportTime} ;
  this.specialTimingsObj.end = {...this.exportTime} ;
  this.specialTimingsObj.mode = 'Online' ;
  this.specialTimingsObj.remarks = '' ;
  this.specialTimingsObj.reason = '' ;

  const obj = {
        time ,
        date  ,
        mode ,
        remarks,
        reason
      }

   let temp = [] ;
   temp.push({...obj}) ;

  const final = {
     special_timings : [...temp] 
  }

    console.log(final)
    
  this.doctorTimings.special_timings.unshift({...final.special_timings}) ;
  this.updateDoctorDetails(final , "Special Timings Saved") ;
}


// FUNCTION TO PATCH VALUES
  updateDoctorDetails(data, msgKey): boolean{
    const headers = this.getDoctorClinicHeader() ;
    this.authService.updateDoctorClinic(data , headers).subscribe(res => {
      this.notification.show(`${msgKey}`, "ok", 8000) ;
     
     let i = 0 ;
     for(let doctor of this.allClinicData.doctors){
      if(this.dialogData.doctorId == doctor.doctor_id){
         for(let key in data){
          this.allClinicData.doctors[i][key] = data[key] ;
        }
      }
      i++ ;
    }
      console.log(this.allClinicData);
    }, err => { 
      console.log(err) ;
      return false ;
    });

    return true ;
  }


  getDoctorClinicHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': this.dialogData.doctorId,
      Authorization: `Bearer ${token}`
    })
 }

  callDoctorClinicAPI(event) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': this.dialogData.doctorId,
      Authorization: `Bearer ${token}`
    });
    if (event === 'unlink') {
      const alertDialogRef = this.dialog.open(AlertComponent, {
        width: '400px',
        data: {
          title: 'Are you sure?',
          message: "All the doctor's data will be deleted permanently",
        }
      });
      alertDialogRef.afterClosed().subscribe(result => {
        if (result === 'okay') {
          this.authService.unlinkDoctorClinic(headers).subscribe(data => {
            if (data) {
              this.notification.show('Unlink Done Successfully', 'Ok', 8000);
              this.dialogRef.close('unlink');
            }
          },
            error => console.log('unlink doctor-clinic error', error));
        } else {
          this.dialogRef.close('cancel');
        }
      });
    } else {
      if (event.checked) {
        this.authService.activateDoctorClinic(headers).subscribe(data => {
          if (data) {
            this.notification.show('Activation Done Successfully', 'Ok', 8000);
            this.dialogRef.close('activate');
          }
        },
          error => console.log('activate doctor-clinic error', error));
      } else {
        const alertDialogRef = this.dialog.open(AlertComponent, {
          width: '400px',
          data: { title: 'Are you sure?', message: "The Doctor will be inactive and not able to take part in any form" }
        });
        alertDialogRef.afterClosed().subscribe(result => {
          if (result === 'okay') {
            this.authService.deactivateDoctorClinic(headers).subscribe(data => {
              if (data) {
                this.notification.show('De-Activation Done Successfully', 'Ok', 8000);
                this.dialogRef.close('deactivate');
              }
            },
              error => console.log('deactivate doctor-clinic error', error));
          } else {
            this.dialogRef.close('cancel');
          }
        });
      }
    }
  }

  closeModal() {
    // this.shareService.updateClinicData(this.allClinicData) ;
    this.dialogRef.close();
  }

  ngOnDestroy(){
    // this.shareService.updateClinicData(this.allClinicData) ;
  }

}
