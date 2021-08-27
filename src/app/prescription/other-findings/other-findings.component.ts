import { Component, OnInit, Input, OnDestroy, Output ,ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { PrescriptionService } from '../prescription.service' ;
import { AppointmentService } from "../../appointment/appointment.service" ;
import { Debounce } from '../../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-other-findings',
  templateUrl: './other-findings.component.html',
  styleUrls: ['./other-findings.component.scss']
})
export class OtherFindingsComponent implements OnInit {

	currentClass = "" ;
  showRight ;
  curTermPage = 0 ;
  medTerms = [] ;
  totalMedTerms = 0 ;
  @Input() data ;	
  @Output() tabChange: EventEmitter<any> = new EventEmitter() ;
  @ViewChild("symptomValue") symptomInput: ElementRef ;
  noSearch = false  ;
  selectedSymptoms = [] ;	
  symptoms = [] ;
  symptomsOption = [] ;
  currentSymptomIndex ;
  displaySymptoms = [
  	{conceptId : "390789009" , term : "Head lag", med_term : "", ICD_code: ""},
  	{conceptId: "16331000" , term : "Heartburn", med_term : "", ICD_code: "" }
  ]; 
  afterCloseSymptoms = [] ;

  constructor(private prescriptionService: PrescriptionService, private appointmentService: AppointmentService) { }

  ngOnInit() {
  	if(this.data.findings.length > 0){
  		this.createSymptomsArray() ;
      this.currentSymptomIndex = 0 ;
  	}
    this.prescriptionService.selected.subscribe(selected => {
      if(selected === 'findings')
        this.currentClass = "" ;
      else
        this.currentClass = "inner_content_div" ;

      this.showRight = (selected === 'findings');
    });
  	console.log(this.data);
  }


  createSymptomsArray(){
  	for(let symptom of this.data.findings){
  		let obj = {
  			conceptId : symptom.finding_id.split("|")[0] ,
  			term : symptom.finding_name.split("|")[0],
        med_term : symptom.finding_name.split("|")[1] ? symptom.finding_name.split("|")[1] : "",
        ICD_code : symptom.finding_id.split("|")[1] ? symptom.finding_id.split("|")[1] : ""
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
    document.getElementById('loader_other_id').style.display = 'block'
  	if(value.length > 1){
  		this.prescriptionService.readPrescriptionData({term: value , semanticTag:'finding'}).subscribe(result => {
	  		if(result.items.length){
          let tempSymptoms = [] ;
          for(let val of result.items){
            const data = {conceptId : val.concept.conceptId, term : val.term, med_term: "", ICD_code: ""} ;
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
        document.getElementById('loader_other_id').style.display = 'none'
	  	});
  	}else{
      document.getElementById('loader_other_id').style.display = 'none'
      }
  }

  selectSymptom(index){
    let sctid ;
  	if(this.symptoms.length){
  		this.selectedSymptoms.push(this.symptoms[index]) ;
      sctid = this.symptoms[index].conceptId ;

  		this.symptoms.splice(index,1) ;

      this.prescriptionService.getSnomedChildren(sctid).subscribe(data => {

        let oldSize = data.length > 28 ? 28 : data.length ;
        let newData = [] ;
        for(let x=0 ; x<oldSize; x++){
          if(data[x].pt.term.length < 30 ){
            newData.push(data[x].pt.term) ;
          }
        }

        let size = newData.length > 24 ? 24 : newData.length ;
        this.totalMedTerms = size ;
        let tempMedTerms = [] ;
        for(let i=0 ; i<(size/4); i++){
          let tempCol = [] ;
          for(let j=(i*4); j<(i*4)+4 && j<size; j++){
            tempCol.push(newData[j])
          }
          tempMedTerms.push(tempCol) ;
        } 
        this.medTerms = tempMedTerms ;
        console.log(this.medTerms) ;
      }) ;
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
    
    if(sctid){
      this.prescriptionService.getICD10Map(sctid).subscribe(data => {
          this.selectedSymptoms[this.currentSymptomIndex].ICD_code = data.items[0].additionalFields.mapTarget;
      }); 
    }
  }

  removeSymptom(index){
  	this.symptoms.push(this.selectedSymptoms[index]);
  	this.selectedSymptoms.splice(index,1) ;
    this.symptomsOption.splice(index,1) ;
    this.currentSymptomIndex = 0 ;
    this.medTerms = [] ;
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

  selectMedTerm(value, index){
    const curMedTerm = this.selectedSymptoms[this.currentSymptomIndex].med_term ;
    this.selectedSymptoms[this.currentSymptomIndex].med_term = value ;
    this.medTerms[this.curTermPage].splice(index,1) ;

    if(curMedTerm){
      this.medTerms[this.curTermPage].push(curMedTerm) ;
    }
  }

  addSymptom(value){
  	if(value){
      this.selectedSymptoms.push({conceptId : "-1" , term : value, med_term: "", ICD_code : ""}) ;
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
        finding_name : this.selectedSymptoms[i].term + "|" + this.selectedSymptoms[i].med_term ,
        finding_id : this.selectedSymptoms[i].conceptId + "|" + this.selectedSymptoms[i].ICD_code,
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
  		findings : finalSymptoms
  	}
  	this.appointmentService.appointmentCreate(data_obj , 'patch').subscribe(result => {
  		this.data.findings = finalSymptoms;
  		console.log('other findings Updated');
  	});
  }

   setSymptom(index){
    this.currentSymptomIndex = index ;
    this.medTerms = [] ;
  }

  prevTerms(){
    if(this.curTermPage > 0){
      this.curTermPage-- ;
    }
  }

  nextTerms(){
    if(this.curTermPage < this.medTerms.length - 1){
      this.curTermPage++ ;
    }
  }


  toggle(){
    console.log(this.currentClass);
    if(this.currentClass){
      this.currentClass = "" ;
      this.prescriptionService.setSelected('findings');
    }
    else{
      this.currentClass = "inner_content_div";
    }
  }

  onSubmit(){
    this.toggle();
    this.onComplete() ;
    this.afterCloseSymptoms = [...this.selectedSymptoms] ;
    this.tabChange.emit(2) ;
  }

}
