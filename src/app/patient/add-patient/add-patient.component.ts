import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { FormGroup, FormControl, Validators } from '@angular/forms' ;
import { PatientService } from '../patient.service';
import { NotificationService } from '../../core/services/notification.service';
import { DatePipe } from '@angular/common' ;
import { SearchPatientComponent } from '../../shared/components/search-patient/search-patient.component' ;
import { MatDialog } from '@angular/material/dialog';
import { BookAppointmentComponent } from '../../appointment/book-appointment/book-appointment.component' ;


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})  
export class AddPatientComponent implements OnInit {

  detailedForm = false ;
  disableQuickForm = false ;
  quickCall = false ;
  quickForm ;
  selectedTab = 0;
  patientData ;
  data = {};
  create_data = {
    'personal_info': null,
    'family_history': null,
    'medical_history': null,
    'emergency_contact': {
        emergency_contact_details: [],
        care_person_details: []
      },
    'policy': null
  };

  newUserModalData: any = {
    name : '',
    initials : '',
    phone_number : '',
    date : ''
  }

  constructor(private router: Router,
              private patientService: PatientService, 
              private datepipe: DatePipe,
              private notification: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.quickForm = new FormGroup({
      'q_first_name' : new FormControl('', Validators.required),
      'q_middle_name' : new FormControl(''),
      'q_last_name' : new FormControl('', Validators.required),
      'q_dob' : new FormControl('', Validators.required),
      'q_gender' : new FormControl('m', Validators.required),
      'q_country_code' : new FormControl('+91', Validators.required),
      'q_number' : new FormControl('', Validators.required),
    }) ;
  }

  showDetailedForm(){
    
    if(this.quickForm.valid && !this.detailedForm){
      const obj = {
        first_name : this.quickForm.value.q_first_name,
        middle_name : this.quickForm.value.q_middle_name,
        last_name : this.quickForm.value.q_last_name,
        date_of_birth : this.datepipe.transform(new Date(this.quickForm.value.q_dob), 'yyyy-MM-dd'),
        gender : this.quickForm.value.q_gender,
        contact_details : [{
          phone_type : 'mobile',
          country_code : this.quickForm.value.q_country_code,
          phone_number : this.quickForm.value.q_number
        }],
      }
      this.patientService.patientCreateWithRet(obj, 'create').subscribe(result => {
        this.patientService.readPatientDetailsById(result.id).subscribe(patientData => {
          const rawData = atob(patientData.Data) ;
          this.patientData = JSON.parse(rawData) ? JSON.parse(rawData) : {} ;
          console.log(this.patientData) ;
          this.detailedForm = !this.detailedForm ;
          this.quickForm.disable() ;
          this.disableQuickForm = true ;
          this.notification.show("Patient Created", "ok", 3000) ;
        }) ;
      }, err => console.log(err)) ;
    }
    else if(this.quickForm.valid && this.detailedForm){
      this.detailedForm = !this.detailedForm ;
    }
    else{
      this.notification.show("Please fill all fields", "ok", 3000) ;
    }  
  }

  onSubmitQuickPatient(){
    
    if(this.quickForm.valid){
      const obj = {
        first_name : this.quickForm.value.q_first_name,
        middle_name : this.quickForm.value.q_middle_name,
        last_name : this.quickForm.value.q_last_name,
        date_of_birth : this.datepipe.transform(new Date(this.quickForm.value.q_dob), 'yyyy-MM-dd'),
        gender : this.quickForm.value.q_gender,
        contact_details : [{
          phone_type : 'mobile',
          country_code : this.quickForm.value.q_country_code,
          phone_number : this.quickForm.value.q_number
        }],
      };

      this.patientService.patientCreateWithRet(obj, 'create').subscribe(result => {

          this.quickForm.disable() ;
          this.disableQuickForm = true ;
  
         if(result.id){
           this.patientService.readPatientDetailsById(result.id).subscribe(patientData => {

            const rawData = atob(patientData.Data) ;
            this.patientData = JSON.parse(rawData) ? JSON.parse(rawData) : {} ;
            this.newUserModalData.name = `${this.patientData.first_name} ${this.patientData.last_name}` ;
            this.newUserModalData.initials = `${this.patientData.first_name[0]}${this.patientData.last_name[0]}`.toUpperCase() ;
            this.newUserModalData.phone_number = this.patientData.contact_details[0].phone_number ;
            this.newUserModalData.date = this.datepipe.transform(new Date(), 'dd-MMM-yyyy') ;
           })
         }
         else{
          this.quickCall = true ;
         }
      }, err => console.log(err)) ;
    }
  }

  onCloseModal(){
    this.router.navigate(['/queuemgmt'])
  }

  isQuickFormValid(field): boolean {
    return ((!this.quickForm.get(field).valid && this.quickForm.get(field).touched));
  }


  bookAppointment() {
    const dialogRef = this.dialog.open(BookAppointmentComponent, {
      width: '800px',
      data: {patientData: this.patientData}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  submitPatient() {

   const addresses = this.create_data.personal_info.address_details.map((address) => {
     const data = {
       address_type: address.type.home ? 'home': 'office',
       address_line1: address.address,
       address_line2: address.address_line_1,
       address_line3: address.address_line_2,
       city: address.city,
       district: address.district,
       state: address.state,
       pin_code: address.pincode,
       country: address.country,
       country_code: address.country_code
     };
     return data;
   });

   // const contacts = this.create_data.personal_info.contact_details.map((contact) => {
   //   const data = {
   //     phone_type: contact.phone_type,
   //     country_code: contact.country_code,
   //     phone_number: contact.phone_number
   //   };
   //   return data;
   // });

   const emergency_persons = this.create_data.emergency_contact.emergency_contact_details.map((emergency) => {
     const data = {
       name: emergency.name,
       relationship: emergency.relationship,
       phone_type: '',
       phone_number: emergency.mobile_no,
       email_id: emergency.email_id,
       address_type: '',
       address_line1: emergency.address,
       address_line2: emergency.address_line_1,
       address_line3: emergency.address_line_2,
       city: emergency.city,
       district: emergency.district,
       state: emergency.state,
       pin_code: emergency.pincode,
       country: emergency.country,
       country_code: emergency.country_code
     };

     return data;
   });

   const care_persons = this.create_data.emergency_contact.care_person_details.map((careperson) => {
    const data = {
      name: careperson.name,
      relationship: careperson.relationship,
      phone_type: 'mobile',
      phone_number: careperson.mobile_no,
      email_id: careperson.email_id,
      address_type: '',
      address_line1: careperson.address,
      address_line2: careperson.address_line_1,
      address_line3: careperson.address_line_2,
      city: careperson.city,
      district: careperson.district,
      state: careperson.state,
      pin_code: careperson.pincode,
      country: careperson.country,
      country_code: careperson.country_code
    };

    return data;
   });

   const legal_proofs = this.create_data.personal_info.legal_proofs.map((proof) => {
     const data = {
       proof_name: proof.type,
       proof_details: proof.number
     };

     return data;
   })

    const data = {
      _id : this.patientData._id,
      // first_name: this.create_data.personal_info.personal_info.first_name,
      middle_name: this.create_data.personal_info.personal_info.middle_name,
      // last_name: this.create_data.personal_info.personal_info.last_name,
      // gender: this.create_data.personal_info.personal_info.gender,
      // date_of_birth: this.create_data.personal_info.personal_info.dob,
      occupation: this.create_data.personal_info.personal_info.occupation,
      email_id: this.create_data.personal_info.personal_info.email,
      addresses: addresses,
      // contact_details: contacts,
      emergency_person_details: emergency_persons,
      care_person_details: care_persons,
      family_history: this.create_data.family_history ? this.create_data.family_history : "",
      medical_history: this.create_data.medical_history ? this.create_data.medical_history : {} ,
      legal_proof: legal_proofs,
      allergies: [],
      "visit_history": [],
      "vaccines_given_or_due": [],

    };
    console.log(data);
    this.patientService.patientCreate(data, 'patch');
  }

  tabChangeEmit(ev) {
    this.create_data[ev.key] = ev.data;
    if (ev.type) {
      this.submitPatient();
    } else {
      this.selectedTab = ev.index;
    }
    console.log(ev);
  }

  tabChanged(tab) {
    this.selectedTab = tab ;
  }

  goToQueueMgmt(){
    this.router.navigate(['/queuemgmt']) ;
  }

}