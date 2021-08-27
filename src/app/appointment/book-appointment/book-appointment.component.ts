import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router' ;
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from '../appointment.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common' ;
import { ShareService } from '../../share.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {

  role = localStorage.getItem('roles');
  appointmentForm: FormGroup;
  isFormSubmitted = false;
  formClass: string;
  ctryCodes = ['91', '90', '99'];
  doctorList = [] ;
  selectedDoctorIndex = null ;
  name = '' ;
  doctorHoliday = false ;
  day = null ;
  weekday = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'] ;
  slots = [] ;
  selectedSlotIndex = null ;
  doctorTimes = [] ;
  clinicData ;
  

  constructor(private fB: FormBuilder, private apppointmentService: AppointmentService, private notification: NotificationService ,private authService: AuthService,
              @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any, private router: Router, private datePipe: DatePipe, private dialog : MatDialog) {
  }

  getPatientDetails() {
    if (this.dialogData && this.dialogData.patientData) {
      this.appointmentForm.patchValue({
        firstName: this.dialogData.patientData.first_name ,
        dob: this.dialogData.patientData.date_of_birth,
        phone: this.dialogData.patientData.contact_details[0].phone_number,
        countryCode: this.dialogData.patientData.contact_details[0].country_code
      });
    }
  }

  ngOnInit() {
    this.appointmentForm = this.fB.group({
      firstName: ['', Validators.required],
      dob: ['', Validators.required],
      countryCode: '',
      phone: ['', Validators.required],
      doctorId: ['', Validators.required],
      appointment_date: ['', Validators.required],
      appointment_type: ['Online', Validators.required],
      slot_type : ['morning' , Validators.required],
      quick_book : ['']
    });
    this.getPatientDetails();
    this.getClinicDetails();
  }

//   getClinicDetails() {
//     this.authService.readClinicDetails().subscribe((data: any) => {
//       if (data) {
//         const clinicData = atob(data.Data);
//         const doctorDet = JSON.parse(clinicData).doctors;
//         this.getDoctorDetails(doctorDet);
//       }
//     }, (error) => {});
//   }
  
  async getClinicDetails() {
    const subs = this.authService.readClinicDetails();
    if (subs) {
      (await subs).subscribe((data: any) => {
        if (data) {
          const clinicData = atob(data.Data);
          this.clinicData = JSON.parse(clinicData) ;
          const doctorDet = JSON.parse(clinicData).doctors;
          this.getDoctorDetails(doctorDet);
        }
      }, (error) => {});
    }

  }

  getDoctorDetails(doctorDet) {
    if (doctorDet) {
      doctorDet.forEach(element => {
        if(element.employment_status === 'a'){
          this.doctorList.push({doctor_id : element.doctor_id , doctor_name: element.doctor_name}) ;
          const obj = {
            specialHoliday : element.holidays,
            specialTimings : element.special_timings,
            estimatedTime : +element.estimated_time_per_appointment ?  +element.estimated_time_per_appointment : 15 ,
            timings : element.timings
          }

          this.doctorTimes.push(obj) ;
        }    
      });
       console.log(doctorDet) ;
    }
  }

  findDay(dateValue){
    let date = new Date(dateValue);
    return date.getDay();
  }

  getTimeSlots(){
    this.doctorHoliday = false ;
    this.slots = [] ;
    this.selectedSlotIndex = null ;
    this.setDoctorIndex(this.appointmentForm.value.doctorId) ; 
    if(this.selectedDoctorIndex === null)
      return ;
    const doctorId = this.doctorList[this.selectedDoctorIndex].doctor_id ;
    const date = this.appointmentForm.value.appointment_date ;
    if(doctorId && date){
      const docIndex = this.selectedDoctorIndex ;
      for(let holiday of this.doctorTimes[docIndex].specialHoliday){
        if(this.getDateAsString(holiday.date) === this.getDateAsString(new Date(date))){
          this.doctorHoliday = true ;
          return ;
        }
      }

      const day = this.findDay(date) ;
      const mode = this.appointmentForm.value.appointment_type ;
      let timePack = [] ;
      const estimatedTime = this.doctorTimes[docIndex].estimatedTime ;
      let specialTimeExist = false ;

      for(let specialTime of this.doctorTimes[docIndex].specialTimings){
        if(this.getDateAsString(new Date(specialTime.date)) === this.getDateAsString(new Date(date))){
          if(specialTime.mode === mode){
            timePack.push(specialTime) ;
          }
          specialTimeExist = true ;
        }
      }

      if(!specialTimeExist){
        for(let timing of this.doctorTimes[docIndex].timings){

          if(timing.day === day && timing.mode === mode){
            timePack.push(timing) ;
          }
        }   
      }
     
  
      if(!timePack.length){
        this.doctorHoliday = true ;
      }
      else{
        // create slots
        const slot_type = this.appointmentForm.value.slot_type ;
        let bookedSlots ;
        const headerDate = this.datePipe.transform(date, 'yyyy-MM-dd') ;
        this.apppointmentService.getDoctorSlots(headerDate, doctorId).subscribe(result => {
          
          const slotsData = atob(result.Data) ;
          if(slotsData)
             bookedSlots = [...JSON.parse(slotsData)] ;
          else
            bookedSlots = [] ;

           for(let pack of timePack){
              const duration = this.getDuration(pack.time) ;
              const est = this.doctorTimes[docIndex].estimatedTime ;
              const no_of_slots = Math.floor(duration / est) ;
              let slot_type_check ;
              let slot_type_time = 14 ; // 2PM
              slot_type === 'morning' ? slot_type_check = 1 : slot_type_check = 0 ;

              const start = {
                hour : +(pack.time[0] + pack.time[1]),
                min :  +(pack.time[2] + pack.time[3]) 
              }

              const end = {
                hour : +(pack.time[5] + pack.time[6]),
                min :  +(pack.time[7] + pack.time[8])
              }

              let s = (start.hour*60) + start.min ;
              let e = (end.hour*60) + end.min ;

              while(s <= e){
                let curHour = Math.floor(s / 60) ;
                let curMin =  s % 60 ;
                let unit = ' AM' ;
                if((slot_type_check && slot_type_time > curHour) || (!slot_type_check && slot_type_time <= curHour)){
                  if(curHour > 12) {
                    curHour = curHour % 12 ;
                    unit = ' PM' ;
                  }
                  else if(curHour == 12){
                    unit = ' PM' ;
                  }
                  else if(curHour == 0){
                    curHour = 12 ;
                  }
                  let curSlot = curHour.toString() + ':' + curMin.toString()  ;
                  if(curMin < 10){
                    let len = curSlot.length ;
                    curSlot = curSlot.slice(0,len-1) + '0' + curSlot.slice(len-1);
                  }
                  curSlot = curSlot + unit ;
                  const slotObj = {
                    slot: curSlot,
                    isBooked: this.compareSlot(curSlot, bookedSlots) 
                  }
                  this.slots.push(slotObj) ;
                  s = s + est ;
                }
                else{
                  break ;
                }
              }
            }
           console.log(this.slots);    
        });
      }
    }
  }

  compareSlot(slot, bookedSlots){
   const curSlot =  new Date(this.getDateAsString(this.appointmentForm.value.appointment_date) + ':' + slot) ;
   const mode = this.appointmentForm.value.appointment_type ;

   for(let dbSlots of bookedSlots){
     const CIT = new Date(dbSlots.check_in_time.toString()) ;
     if(JSON.stringify(curSlot) == JSON.stringify(CIT) && dbSlots.appointment_type == mode){
       return true ;
     }
   }
   return false ;
  }

  onSelectSlot(index, isBooked){

    if(isBooked)
        return ;

    if(index < this.slots.length){
      if(index === this.selectedSlotIndex){
        this.selectedSlotIndex = null ;
        return ;
      }
      this.selectedSlotIndex = index ;
    }
  }

  setDoctorIndex(index){
    if(index !== '')
      this.selectedDoctorIndex = index ;
    else
      this.selectedDoctorIndex = null ;
  }

  getDuration(timeString){
    const start = {
      hour : +(timeString[0] + timeString[1]) ,
      min :  +(timeString[2] + timeString[3]) 
    }

    const end = {
      hour : +(timeString[5] + timeString[6]),
      min : +(timeString[7] + timeString[8])
    }

    let duration = ((end.hour - start.hour) * 60) + (end.min - start.min) ;
    return duration ;
  }

  bookQuickApp(value){
      console.log(this.appointmentForm.value.quick_book);

    if(value){

      if(this.role == "doctor"){
        this.selectedDoctorIndex = 0 ;
      }
      else{
        if(this.selectedDoctorIndex == null){
          this.notification.show("Please select a doctor", "OK", 5000) ;
          this.appointmentForm.controls['quick_book'].setValue(false) ;
          return ;
        }
      }

      const date = new Date() ;
      this.appointmentForm.value.appointment_date = new Date() ;
      let hour = date.getHours() ;
      let min = date.getMinutes() ;

      let slot = "" ;

      if(hour < 10){
        slot = slot + "0" ;
      }

      slot = slot + hour.toString() + ":" ;

      if(min < 10){
        slot = slot + "0" ;
      }

      slot = slot + min.toString() ;

      this.slots = [] ;
      this.slots.push({slot, isBooked: true}) ;
      this.selectedSlotIndex = 0 ;

      console.log(this.slots) ;
      this.onSubmit() ;
    }

  }

  isFirstFormValid(field): boolean {
    return ((!this.appointmentForm.get(field).valid && this.appointmentForm.get(field).touched)
      || (this.appointmentForm.get(field).untouched && this.isFormSubmitted));
  }

  onSubmit() {
    this.isFormSubmitted = true;
    const quickBook = this.appointmentForm.value.quick_book ;
    this.formClass = 'invalid-form';

    if ((this.appointmentForm.valid || quickBook) && this.selectedSlotIndex !== null) {
      this.appointmentForm.value.firstName =  this.dialogData.patientData._id  ;
      this.appointmentForm.value.appointment_date = this.getDateAsString(this.appointmentForm.value.appointment_date) ;
      this.appointmentForm.value.doctorId = this.doctorList[this.selectedDoctorIndex].doctor_id ;
      const check_in_time = new Date(this.getDateAsString(this.appointmentForm.value.appointment_date) + ':' + this.slots[this.selectedSlotIndex].slot) ;
      this.appointmentForm.value.dob = moment(this.appointmentForm.value.dob).format('YYYY-MM-DD');
      let  appObj = Object.assign({}, this.appointmentForm.value , {
        check_in_time : check_in_time,
        clinic_name : this.clinicData.name,
        clinic_address : this.clinicData.address,
        doctor_name : this.doctorList[this.selectedDoctorIndex].doctor_name
      }) ;
      console.log(appObj); 
      console.log(this.doctorList);
      this.apppointmentService.appointmentCreate(appObj, 'create');
      this.router.navigate(['queuemgmt']) ;
    }
    else{
      console.log("No slot selected", this.selectedSlotIndex, this.appointmentForm.valid) ;
      this.notification.show("No Slot Selected", "Ok", 2000);
    }
  }

  getDateAsString(date){
    let appointment_date = date.toString() ;
    appointment_date = new Date(appointment_date);
    appointment_date = (appointment_date.getFullYear() + "-" + ("0"+(appointment_date.getMonth()+1)).slice(-2) + "-" + ("0" + appointment_date.getDate()).slice(-2));
    return appointment_date ;
  }

  closeModal() {
    // this.shareService.updateClinicData(this.allClinicData) ;
    this.dialog.closeAll();
  }

}





// doctorTimes = [{
  //   specialHoliday : [
  //     { name : 'Marrige' , date : new Date('2020-02-01')} , { name : 'meri marzi' , date : new Date('2020-02-14')} 
  //   ] ,
  //   estimatedTime : 15 ,
  //   timings : [
  //     { day : 1 , time : '0700-0800' , mode : 'online'},
  //     { day : 1 , time : '0830-1130' , mode : 'offline'},
  //     { day : 3 , time : '1200-1600' , mode : 'offline'},
  //     { day : 5 , time : '1400-1830' , mode : 'offline'},
  //     { day : 5 , time : '1712-2210' , mode : 'online'},
  //     { day : 6 , time : '1115-1330' , mode : 'online'},
  //   ],
  //   specialTimings : [
  //     { date : new Date('2020-04-10') , time : '0800-0900' , mode : 'online'},
  //     { date : new Date('2020-04-12') , time : '0900-1230' , mode : 'offline'},
  //     { date : new Date('2020-04-14') , time : '1230-1300' , mode : 'offline'},
  //     { date : new Date('2020-04-16') , time : '1530-1830' , mode : 'offline'},
  //     { date : new Date('2020-04-17') , time : '1800-2210' , mode : 'online'},
  //     { date : new Date('2020-04-30') , time : '1100-1330' , mode : 'online'},
  //   ]
  // }] ;
  // bookedSlots = [new Date("Sun Sep 20 2020 09:45:00 GMT+0530") , new Date("Sun Sep 13 2020 10:00:00 GMT+0530")]