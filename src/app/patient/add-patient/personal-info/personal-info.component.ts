import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../../patient.service' ;
import { NotificationService } from '../../../core/services/notification.service'
import * as moment from 'moment';
import { DatePipe } from '@angular/common' ;
import { Debounce } from '../../../core/decorators/debounce.decorator' ;
import { CountryCodeService } from 'src/app/core/services/country-code.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  
  errorMsg = [] ;
 
  curContact = {
    phone_type : "",
    country_code : "",
    phone_number : ""
  };

  genders = [{
      value: 'm',
      text: 'Male',
    },
    {
      value: 'f',
      text: 'Female',
    },
    {
      value: 'o',
      text: 'Other',
    }
  ];
  nationality = ['India', 'American', 'Others'];

  contactTypes = [{
      value: 'telephone',
      text: 'Telephone'
    },
    {
      value: 'mobile',
      text: 'Mobile'
    }
  ];

  proofTypes = [{
      value: 'adhaar',
      text: 'Adhaar'
    },
    {
      value: 'passport',
      text: 'Passport'
    }
  ];

  infoForm: FormGroup;
  @Output() notifyNext = new EventEmitter();
  @Input('patientData') patientData ;
  countryCodes;
  data: any = {
    address_details: [{
      type: {home: true, office: false},
      address: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
      country: '',
      country_code: ''
    }],
    legal_proofs: [{
      type: this.proofTypes[0].value,
      number: ''
    }]
  }
  constructor(private patientService: PatientService, private datepipe: DatePipe, private notification: NotificationService, private countryCodeService: CountryCodeService ) {
   
  }

  ngOnInit() {
    this.infoForm = new FormGroup({
      first_name: new FormControl(this.patientData.first_name, [Validators.required]),
      gender: new FormControl(this.findGender(this.patientData.gender), [Validators.required]),
      dob: new FormControl(this.datepipe.transform(new Date(this.patientData.date_of_birth), 'yyyy-MM-dd'), [Validators.required]),
      middle_name : new FormControl(this.patientData.middle_name) ,
      last_name : new FormControl(this.patientData.last_name, [Validators.required]),
      age : new FormControl(this.calculateAge(new Date(this.patientData.date_of_birth))),
      occupation : new FormControl(''),
      email : new FormControl('', [Validators.email])
    });
    console.log(this.patientData) ;
    this.data = {...this.data , 
        personal_info: {
        first_name: this.patientData.first_name,
        middle_name: this.patientData.middle_name,
        last_name: this.patientData.last_name,
        gender: this.patientData.gender,
        dob: this.datepipe.transform(new Date(this.patientData.date_of_birth), 'yyyy-MM-dd'),
        email: this.patientData.email_id,
        occupation: this.patientData.occupation,
        age: this.calculateAge(new Date(this.patientData.date_of_birth)),
        nationality : 'India'
      },
      contact_details: this.patientData.contact_details 
    };

    for(let i=0; i<this.data.contact_details.length; i++){
      const obj = {
        contactMsg : "Verified",
        status : 1     // 1 --> verified   2 --> Not Verified    0 --> Not Available   3 --> Waiting
      }
      this.errorMsg.push(obj) ;
    }

    if(this.patientData.legal_proofs && this.patientData.legal_proofs.length){
      this.data = {...this.data , legal_proofs : this.patientData.legal_proofs} ;
    }

    if(this.patientData.address_details && this.patientData.address_details.length){
      this.data = {...this.data , address_details : this.patientData.address_details} ;
    }

     this.countryCodes = this.countryCodeService.countryCode;
  }

  findGender(code){
    for(let i of this.genders){
      if(i.value == code){
        return i.text ;
      }
    }
  }

  calculateAge(date){
    let today = new Date() ;
    const milliSec = today.getTime() - date.getTime() ;
    const days = (milliSec / (1000*3600*24)) ;
    const months = Math.round((days % 365) / 30) ;
    const years = Math.floor(days / 365) ;
    console.log(`${years.toString()} Years ${months.toString()} Months`) ;

    return `${years.toString()} Years ${months.toString()} Months` ;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  checkAddressType(index, val, ev) {
    this.data.address_details[index].type[val] = ev.checked;
  }

  update_personal_info(key, ev) {
    this.data.personal_info[key] = ev.target.value;
  }

  update_nationality(ev){
    this.data.personal_info.nationality = ev ;
  }

  selectGender(ev) {
    this.data.personal_info['gender'] = ev;
  }

  setDateOfBirth(ev) {
    this.data.personal_info['dob'] = moment(ev).format('YYYY-MM-DD');
    this.data.personal_info.age = this.calculateAge(new Date(this.data.personal_info['dob']))
  }

  selectContactType(ev, index) {
    this.data.contact_details[index]['phone_type'] = ev;
    const contact = this.data.contact_details[index] ;
    
    if(contact.phone_type && contact.country_code && contact.phone_number){
      this.saveContact(index) ;
    }
  }

  selectCountryCode(ev, index) {
    this.data.contact_details[index]['country_code'] = ev;
    const contact = this.data.contact_details[index] ;
    
    if(contact.phone_type && contact.country_code && contact.phone_number){
      this.saveContact(index) ;
    }
  }

  @Debounce(500)
  update_contact_number(ev, index) {
    this.data.contact_details[index]['phone_number'] = ev.target.value;
    const contact = this.data.contact_details[index] ;
    
    if(contact.phone_type && contact.country_code && contact.phone_number){
      this.saveContact(index) ;
    }
  }

  removeContact(index) {
    if(this.data.contact_details.length > 1){
      this.data.contact_details.splice(index, 1);
      this.errorMsg.splice(index,1) ;
    }
  }

  addingContactValid(mode){

    const index = this.data.contact_details.length - 1 ;
    const cd = this.data.contact_details[index] ;

    if(mode == 'create'){
      if(index == 0)
        return true ;
    }
    
    if(cd.phone_type && cd.phone_number && cd.country_code){
      return true ;
    }
    else{
      return false ;
    }
  }

  addContact() {
    if(this.addingContactValid('check')){
      this.data.contact_details.push({
        phone_type: this.contactTypes[0].value ,
        country_code: '+91',
        phone_number: ''
      });
      this.errorMsg.push({
        contactMsg : "Waiting",
        status : 0
      }) ;
    }
    else{
      this.notification.show("Please fill the prevous contact fields first", "OK", 5000) ;
    }
  }

  saveContact(index){
    this.errorMsg[index].status = 3 ;
    const obj = {
      _id : this.patientData._id,
      contact_details : [{...this.data.contact_details[index]}]
    }
    this.patientService.updateContactDetails(obj).subscribe(result => {
      console.log(result);
      this.errorMsg[index].status = 1 ;
    }, err => { 
      console.log(err) ;
      this.errorMsg[index].status = 2 ;
    }) ;
  }


  updateAddressField(key, ev, index) {
    this.data.address_details[index][key] = ev.target.value;
  }

  addingAddressValid(mode){
    const index = this.data.address_details.length - 1 ;
    const lastAddress = this.data.address_details[index] ;

    if(mode == 'create'){
      if(index == 0)
        return true ;
    }

    if(lastAddress.address && lastAddress.city && lastAddress.state && lastAddress.pincode && lastAddress.country)
      return true ;
    else
      return false ;        
  }



  addAddress() {
    if(this.addingAddressValid('check')){
      this.data.address_details.push({
        type: {home: false, office: true},
        address: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
        country: '',
        country_code: ''
      });
    }
    else{
      this.notification.show("Please Add previous required field first", "OK", 5000) ;
    }
  }

  removeAddress(index){
    if(this.data.address_details.length > 1){
      this.data.address_details.splice(index,1) ;
    }
  }

  addingLegalProofValid(mode){
    const index = this.data.legal_proofs.length - 1 ;
    const lp = this.data.legal_proofs[index] ;

    if(mode == 'create'){
      if(index == 0)
        return true ;
    }

    if(lp.type && lp.number){
      return true ;
    }
    else
      return false;
  }

  addLegalProof() {
    if(this.addingLegalProofValid('check')){
      this.data.legal_proofs.push({
        type: this.proofTypes[0].value,
        number: ''
      });
    }
    else{
      this.notification.show("Please Fill the previous legal fields first", "OK", 5000) ;
    }
    
  }

  removeProof(index) {
    if(this.data.legal_proofs.length > 1)
      this.data.legal_proofs.splice(index, 1);
  }

  updateLegalProofNumber(index, ev) {
    this.data.legal_proofs[index]['number'] = ev.target.value;
  }

  selectLegalProofType(index, ev) {
    this.data.legal_proofs[index]['type'] = ev;
  }

  next(mode) {
    if (this.infoForm.valid) {
      if(this.addingAddressValid('create') && this.addingLegalProofValid('create')){
        if(mode == 'next'){
          this.notifyNext.emit({index: 1, key: 'personal_info', data: this.data});
        }
        else{
          this.notifyNext.emit({index: 1, key: 'personal_info', data: this.data, type: 'create'});
        }
      }
      else{
        this.notification.show("Please Fill the required fields", "OK" , 5000) ;
      }
    } else {
      this.markFormGroupTouched(this.infoForm);
    }
  }

}
