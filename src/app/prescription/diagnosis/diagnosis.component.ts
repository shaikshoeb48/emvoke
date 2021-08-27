import { Component, OnInit, Input, OnDestroy, Output ,ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { PrescriptionService } from '../prescription.service' ;
import { AppointmentService } from "../../appointment/appointment.service" ;
import { Debounce } from '../../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
 currentClass = "" ;
  showRight  ;
  @Input() data ;  
  @Output() tabChange: EventEmitter<any> = new EventEmitter() ;
  @ViewChild("symptomValue") symptomInput: ElementRef ;
  noSearch = false  ;
  selectedSymptoms = [] ;  
  symptoms = [] ;
  currentSymptomIndex ;
  symptomsOption = [] ;
  displaySymptoms = [
    {conceptId : "390789009" , term : "Head lag"},
    {conceptId: "16331000" , term : "Heartburn" }
  ]; 

  constructor(private prescriptionService: PrescriptionService, private appointmentService: AppointmentService) { }

  ngOnInit() {
    if(this.data.diagnosis.length > 0){
      this.createSymptomsArray() ;
      this.currentSymptomIndex = 0 ;
    }
    this.prescriptionService.selected.subscribe(selected => {
      if(selected === 'diagnosis')
        this.currentClass = "" ;
      else
        this.currentClass = "inner_content_div" ;

      this.showRight = (selected === 'diagnosis') ;
    });

    console.log(this.data);
  }


  createSymptomsArray(){
    for(let symptom of this.data.diagnosis){
      let obj = {
        conceptId : symptom.diagnosis_id ,
        term : symptom.diagnosis_name
      }

      let option = {
        notes : symptom.notes ? symptom.notes : ""
      };
      
      this.selectedSymptoms.push(obj) ;
      this.symptomsOption.push(option);
    }
    this.symptoms = [] ;
    this.displaySymptoms = [] ;
  }


  @Debounce(400)
  searchSymptom(value){
    document.getElementById('loader_diagnosis_id').style.display = 'block'
    if(value.length > 1){
      this.prescriptionService.readPrescriptionData({term: value , semanticTag:'disorder'}).subscribe(result => {
        if(result.items.length){
          let tempSymptoms = [] ;
          for(let val of result.items){
            const data = {conceptId : val.concept.conceptId, term : val.term} ;
            tempSymptoms.push(data) ;
          }
          this.symptoms = tempSymptoms ;
          this.noSearch = false ;
        }
        else{
          this.symptoms = [] ;
          this.displaySymptoms = [] ;
          this.noSearch = true ;
        }
        document.getElementById('loader_diagnosis_id').style.display = 'none'
      });
    }else{
      document.getElementById('loader_diagnosis_id').style.display = 'none'
    }
  }

  selectSymptom(index){
    if(this.symptoms.length){
      this.selectedSymptoms.push(this.symptoms[index]) ;
      this.symptoms.splice(index,1) ;
    }
    else{
      this.selectedSymptoms.push(this.displaySymptoms[index]) ;
      this.displaySymptoms.splice(index,1) ;
      this.symptoms = [...this.displaySymptoms] ;
      this.displaySymptoms = [] ;
    }

     let option = {
      notes : ""
     };

     this.symptomsOption.push(option) ;   

     this.currentSymptomIndex = this.selectedSymptoms.length - 1 ;  
     this.symptomInput.nativeElement.value = "" ;
  }

  removeSymptom(index){
    this.symptoms.push(this.selectedSymptoms[index]);
    this.selectedSymptoms.splice(index,1) ;
    this.symptomsOption.splice(index,1) ;
    this.currentSymptomIndex = 0 ;
  }

  addSymptom(value){
    if(value){
      this.selectedSymptoms.push({conceptId : "-1" , term : value}) ;
      this.noSearch = false ;
      this.symptomInput.nativeElement.value = "" ;

      let option = {
        notes : ""
      };
      this.symptomsOption.push(option) ;
      this.currentSymptomIndex = this.selectedSymptoms.length - 1 ;
    }
  }

  addNotes(value){
    this.symptomsOption[this.currentSymptomIndex].notes = value ;
  }

  onComplete(){
    let finalDiagnosis = [];
    for(let i=0; i < this.selectedSymptoms.length; i++){
      let val = {
        diagnosis_name : this.selectedSymptoms[i].term ,
        diagnosis_id : this.selectedSymptoms[i].conceptId ,
        notes : this.symptomsOption[i].notes
      }

      finalDiagnosis.push(val) ;
    }

    const data_obj = {
      _id : this.data._id ,
      patient_id : this.data.patient_id , 
      clinic_id : localStorage.getItem('clinicId'),
      diagnosis : finalDiagnosis
    }
    this.appointmentService.appointmentCreate(data_obj , 'patch').subscribe(result => {
      this.data.diagnosis = finalDiagnosis;
      console.log('symptoms Updated');
    });
  }

   setSymptom(index){
    this.currentSymptomIndex = index ;
  }


  toggle(){
    if(this.currentClass){
      this.currentClass = "" ;
      this.prescriptionService.setSelected('diagnosis') ;
    }
    else{
      this.currentClass = "inner_content_div";
    }
  }

  onSubmit(){
    this.toggle();
    this.onComplete() ;
    this.tabChange.emit(3) ;
  }


}
