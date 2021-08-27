import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service' ;

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss']
})
export class EmergencyContactComponent implements OnInit {

  data = {
    emergency_contact_details: [{
      name: '',
      relationship: '',
      email_id: '',
      telephone_no: '',
      mobile_no: '',
      alternate_mobile_no: '',
      address: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
      country: '',
      country_code: '',
    }],
    care_person_details: [{
      name: '',
      relationship: '',
      email_id: '',
      telephone_no: '',
      mobile_no: '',
      alternate_mobile_no: '',
      address: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
      country: '',
      country_code: '',
    }]
  };
  @Output() notifyNext = new EventEmitter();
  @Input('patientData') patientData ;

  constructor(private notification: NotificationService ) { }

  ngOnInit() {
   if(this.patientData.emergency_contact_details && this.patientData.emergency_contact_details.length){
    this.data.emergency_contact_details = this.patientData.emergency_contact_details ;
   }

   if(this.patientData.care_person_details && this.patientData.care_person_details.length){
    this.data.care_person_details = this.patientData.care_person_details ;
   }
  }

  update_emergency_details(key, ev, index) {
    this.data.emergency_contact_details[index][key] = ev.target.value;
  }

  update_care_person(key, ev, index) {
    this.data.care_person_details[index][key] = ev.target.value;
  }

  addMoreEmergencyPerson() {
    if(this.isAddingValid('emergency_contact_details', 'check')){
      this.data.emergency_contact_details.push({
        name: '',
        relationship: '',
        email_id: '',
        telephone_no: '',
        mobile_no: '',
        alternate_mobile_no: '',
        address: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
        country: '',
        country_code: '',
      });
    }
    else{
      this.notification.show("Please fill all required Field", "OK", 5000) ;
    }
  }

  addMoreCarePerson() {
    if(this.isAddingValid('care_person_details', 'check')){
      this.data.care_person_details.push({
        name: '',
        relationship: '',
        email_id: '',
        telephone_no: '',
        mobile_no: '',
        alternate_mobile_no: '',
        address: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
        country: '',
        country_code: '',
      });
    }
    else
      this.notification.show("Please fill all required Field", "OK", 5000) ;
  }

  isAddingValid(field, mode){
    const index = this.data[field].length - 1 ;
    const dataValue = this.data[field][index] ;

    if(mode == 'create'){
      if(index == 0)
        return true ;
    }

    if(dataValue.name && dataValue.relationship && dataValue.mobile_no && dataValue.address && dataValue.city && dataValue.state && dataValue.pincode && dataValue.country)
      return true ;
    else
      false ;
  }

  removeEmergencyDetails(index){
    if(this.data.emergency_contact_details.length > 1){
      this.data.emergency_contact_details.splice(index, 1) ;
    }
  }

  removeCarePersonDetails(index){
    if(this.data.care_person_details.length > 1){
      this.data.care_person_details.splice(index, 1) ;
    }
  }

  test(){
    console.log(this.data) ;
  }

  next(mode) {
    if(this.isAddingValid('care_person_details', 'create') && this.isAddingValid('emergency_contact_details', 'create')){
      if(mode == 'next')
        this.notifyNext.emit({index: 4, key: 'emergency_contact', data: this.data});
      else
        this.notifyNext.emit({index: 4, key: 'emergency_contact', data: this.data, type : 'create'});
    }
    else{
      this.notification.show("Please Fill required Fields", "OK", 5000) ;
    }
  }

}
