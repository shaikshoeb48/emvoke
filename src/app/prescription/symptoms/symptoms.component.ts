import { Component, OnInit, Input, OnDestroy, Output ,ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { PrescriptionService } from '../prescription.service' ;
import { AppointmentService } from "../../appointment/appointment.service" ;
import { Debounce } from '../../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit{

  currentClass = "" ;
  showRight ;
  @Input() data ;	
  @Output() tabChange: EventEmitter<any> = new EventEmitter() ;
  @ViewChild("symptomValue") symptomInput: ElementRef ;
  @ViewChild('prescription_notes') prescriptionNotes: ElementRef ;
  noSearch = false  ;
  selectedSymptoms = [] ;	
  symptoms = [] ;
  symptomsOption = [] ;
  currentSymptomIndex ;
  displaySymptoms = [
  	{conceptId : "390789009" , term : "Head lag"},
  	{conceptId: "16331000" , term : "Heartburn" }
  ]; 
  afterCloseSymptoms = [] ;

  constructor(private prescriptionService: PrescriptionService, private appointmentService: AppointmentService) { }

  ngOnInit() {
  	if(this.data.symptoms.length > 0){
  		this.createSymptomsArray() ;
      this.currentSymptomIndex = 0 ;
  	}
    this.prescriptionService.selected.subscribe(selected => {
      if(selected === 'symptoms')
        this.currentClass = "" ;
      else
        this.currentClass = "inner_content_div" ;

      this.showRight = (selected === 'symptoms') ;
    });
  	console.log(this.data);
  }


  createSymptomsArray(){
  	for(let symptom of this.data.symptoms){
  		let obj = {
  			conceptId : symptom.symptom_id ,
  			term : symptom.symptom_name
  		}

      let option = {
        location : symptom.location,
        onset : symptom.onset ,
        severity : symptom.severity ,
        duration : symptom.duration,
        distress_scale : symptom.distress_scale,
        frequency : symptom.frequency,
        event_triggered : symptom.event_triggered,
        notes : symptom.notes
      }
  		this.selectedSymptoms.push(obj) ;
      this.symptomsOption.push(option);
  	}
  	this.symptoms = [] ;
  	this.displaySymptoms = [] ;
  }

  @Debounce(400)
  searchSymptom(value){
    document.getElementById('loader_id').style.display = 'block'
  	if(value.length > 1){
  		this.prescriptionService.readPrescriptionData({term: value , semanticTag:'finding'}).subscribe(result => {
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
        document.getElementById('loader_id').style.display = 'none'
      });
    }else{
      document.getElementById('loader_id').style.display = 'none'
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

    const obj = {
      location : "",
      onset : "",
      severity : "",
      duration : "",
      distress_scale : 0,
      event_triggered : "",
      frequency : "",
      notes : ""
    }
    // this.symptomsOption.splice(this.currentSymptomIndex, 0 , obj) ; 
    this.symptomsOption.push(obj);
    this.currentSymptomIndex = this.selectedSymptoms.length - 1 ;
    this.symptomInput.nativeElement.value = "" ;
  }

  removeSymptom(index){
  	this.symptoms.push(this.selectedSymptoms[index]);
  	this.selectedSymptoms.splice(index,1) ;
    this.symptomsOption.splice(index,1) ;
    this.currentSymptomIndex = 0 ;
  }

  addOption(value , option){
    let index = this.currentSymptomIndex ;
     if(index >= 0){
       const obj = {
         [option] : value
       }
       this.symptomsOption[index] = {...this.symptomsOption[index], ...obj} ;
       console.log(this.symptomsOption[index]) ;
     } 
  }

  addSymptom(value){
  	if(value){
      this.selectedSymptoms.push({conceptId : "-1" , term : value}) ;
      this.noSearch = false ;
      this.symptomInput.nativeElement.value = "" ;
      const obj = {
        location : "",
        onset : "",
        severity : "",
        duration : "",
        distress_scale : 0,
        event_triggered : "",
        frequency : "",
        notes : ""
      }
      this.symptomsOption.push(obj) ;
      this.currentSymptomIndex = this.selectedSymptoms.length - 1 ;
    }
  }

  onComplete(){
  	let finalSymptoms = [];
  	for(let i=0 ; i<this.selectedSymptoms.length; i++){
  		let val = {
  			symptom_name : this.selectedSymptoms[i].term ,
  			symptom_id : this.selectedSymptoms[i].conceptId ,
  			duration : this.symptomsOption[i].duration ,
  			severity : this.symptomsOption[i].severity,
  			location : this.symptomsOption[i].location,
        onset : this.symptomsOption[i].onset,
        distress_scale : this.symptomsOption[i].distress_scale,
        event_triggered : this.symptomsOption[i].event_triggered,
        frequency : this.symptomsOption[i].frequency ,
        notes : this.symptomsOption[i].notes
  		}

  		finalSymptoms.push(val) ;
  	}

  	const data_obj = {
  		_id : this.data._id ,
  		patient_id : this.data.patient_id , 
  		clinic_id : localStorage.getItem('clinicId'),
  		symptoms : finalSymptoms
  	}
  	this.appointmentService.appointmentCreate(data_obj , 'patch').subscribe(result => {
  		this.data.symptoms = finalSymptoms;
  		console.log('symptoms Updated');
  	});
  }

  setSymptom(index){
    this.currentSymptomIndex = index ;
  }

  toggle(){
    if(this.currentClass){
      this.currentClass = "" ;
      this.prescriptionService.setSelected('symptoms');
    }
    else{
      this.currentClass = "inner_content_div";
    }
  }

  onSubmit(){
    this.toggle();
    this.onComplete() ;
    this.afterCloseSymptoms = [...this.selectedSymptoms] ;
    this.tabChange.emit(0) ;
  }

}
