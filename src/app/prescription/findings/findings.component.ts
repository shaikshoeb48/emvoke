import { Component, OnInit, Input, OnDestroy, Output ,ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { PrescriptionService } from '../prescription.service' ;
import { AppointmentService } from "../../appointment/appointment.service" ;
import { Debounce } from '../../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-findings',
  templateUrl: './findings.component.html',
  styleUrls: ['./findings.component.scss']
})
export class FindingsComponent implements OnInit {


  currentClass = "" ;
  displaySubImages = false;
  medTerms = [] ;
  totalMedTerms = 0 ;
  curTermPage = 0 ;
  showRight ;	
  examination_tab = "skin" ;
  lesionModalArray = ['lesion_type', 'location', 'lesion_shape']
  selectedModal = 0 ;
  isLesionSelected = false ;
  @Input() data ;
  @Output() tabChange: EventEmitter<any> = new EventEmitter() ;
  @ViewChild("findingsValue") findingsInput: ElementRef ;
  @ViewChild("dropdown_btn_1") dropdown_btn_1: ElementRef ;
  @ViewChild("dropdown_btn_2") dropdown_btn_2: ElementRef ;
  @ViewChild("dropdown_btn_3") dropdown_btn_3: ElementRef ;
  @ViewChild("dropdown_btn_4") dropdown_btn_4: ElementRef ;
  @ViewChild("dropdown_btn_5") dropdown_btn_5: ElementRef ;  

  @ViewChild("lesionModal") lesionModal: ElementRef ;
  noSearch = false  ;
  selectedFindings = [] ;	
  findings = [] ;
  findingOptions = [] ;
  currentFindingIndex ;
  displayFindings = [
  	{conceptId : "390789009" , term : "Head lag",  med_term : "", ICD_code: ""},
  	{conceptId: "16331000" , term : "Heartburn",  med_term : "", ICD_code: "" }
  ]; 

  constructor(private prescriptionService: PrescriptionService, private appointmentService: AppointmentService) { }

  ngOnInit() {
  	if(this.data.examination_findings.length > 0){
  		this.createSymptomsArray() ;
      this.currentFindingIndex = 0 ;
  	}
    this.prescriptionService.selected.subscribe(selected => {
      if(selected === 'examination_findings')
        this.currentClass = "" ;
      else
        this.currentClass = "inner_content_div" ;

      this.showRight = (selected === 'examination_findings');
    });
   
  	console.log(this.data);
  }

  changeExaminationTab(value){
    this.examination_tab = value ;
  }

  changeModal(value){
    this.selectedModal = value ;
    this.displaySubImages = false;
  }


  addLesion(){
    this.isLesionSelected = true ;

    if(this.selectedFindings.length){
      const i = this.selectedFindings.length - 1 ;

      if(!this.selectedFindings[i].term){
        this.selectedFindings.splice(i,1) ;
      }
    }

    const main_obj = {
      conceptId : -1,
      term : "",
      med_term: "",
      ICD_code : ""
    }  

     const obj = {
      isLesion: true, 
      location : "",
      onset : "",
      severity : "",
      duration : "",
      distress_scale : 0,
      event_triggered : "",
      frequency : "",
      notes : "",
      examination_results : {lesion_type : "" , lesion_shape : "" , lesion_color : "" , lesion_fluid : "" , lesion_sensation : "" , onTouch : "", subTerm : ""}
    }

     this.selectedFindings.push(main_obj) ; 
     this.currentFindingIndex = this.selectedFindings.length - 1 ;
     this.findingOptions.push(obj) ; 
     this.findingsInput.nativeElement.value = "" ;
    
  }

  addTerm(term, isSub){
    if(this.selectedFindings.length){
      this.selectedFindings[this.currentFindingIndex].term = term ;
      console.log(term);

      if(isSub){
        this.displaySubImages = true ;
      }
    }
  }

  // FOR SUB IMAGES
  addSubTerm(value){
     if(!this.isLesionSelected)
      return ; 

    this.displaySubImages = false ;
    const index = this.currentFindingIndex ;
    this.findingOptions[index].examination_results.subTerm = value ;
    this.selectedModal++ ;
    console.log(this.findingOptions[index]);
  }

  createSymptomsArray(){
  	for(let finding of this.data.examination_findings){
  		let obj = {
  			conceptId : finding.finding_id.split("|")[0] ,
  			term : finding.finding_name.split("|")[0],
        med_term : finding.finding_name.split("|")[1] ? finding.finding_name.split("|")[1] : "",
        ICD_code : finding.finding_id.split("|")[1] ? finding.finding_id.split("|")[1] : ""
  		}
       let option = { 
        location : finding.location,
        onset : finding.onset ,
        severity : finding.severity ,
        duration : finding.duration,
        distress_scale : finding.distress_scale,
        frequency : finding.frequency,
        event_triggered : finding.event_triggered,
        notes : finding.notes,
        examination_results : this.createExainationResult(finding.examination_results),
        isLesion :  this.isLesion(this.createExainationResult(finding.examination_results))
      }

  		this.selectedFindings.push(obj) ;
      this.findingOptions.push(option) ;
  	}
  	this.findings = [] ;
  	this.displayFindings = [] ;
  }

  createExainationResult(exam_string){
    return JSON.parse(exam_string) ;
  }

  isLesion(obj){
    return obj.hasOwnProperty('lesion_type') ;
  }

  @Debounce(400)
  searchFindings(value){
    document.getElementById('loader_finding_id').style.display = 'block'
  	if(value.length > 1){
  		this.prescriptionService.readPrescriptionData({term: value , semanticTag:'finding'}).subscribe(result => {
	  		if(result.items.length){
          let tempSymptoms = [] ;
          for(let val of result.items){
            const data = {conceptId : val.concept.conceptId, term : val.term, med_term: "", ICD_code: ""} ;
            tempSymptoms.push(data) ;
          }
          this.findings = tempSymptoms ;
          this.noSearch = false ;
        }
	  		else{
	  			this.findings = [] ;
	  			this.displayFindings = [] ;
	  			this.noSearch = true ;
        }
        document.getElementById('loader_finding_id').style.display = 'none'
	  	});
  	}else{
      document.getElementById('loader_finding_id').style.display = 'none'
    }
  }

  selectFinding(index){
    this.isLesionSelected = false ;
    if(this.selectedFindings.length){
      const i = this.selectedFindings.length - 1 ;

      if(!this.selectedFindings[i].term){
        this.selectedFindings.splice(i,1) ;
      }
    }
     let sctid ;
  	if(this.findings.length){
  		this.selectedFindings.push(this.findings[index]) ;
      sctid = this.findings[index].conceptId ;

  		this.findings.splice(index,1) ;

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
  		this.selectedFindings.push(this.displayFindings[index]) ;
  		this.displayFindings.splice(index,1) ;
  		this.findings = [...this.displayFindings] ;
  		this.displayFindings = [] ;
  	}

     const obj = {
      isLesion: false, 
      location : "",
      onset : "",
      severity : "",
      duration : "",
      distress_scale : 0,
      event_triggered : "",
      frequency : "",
      notes : "",
      examination_results : {}
    }

     this.currentFindingIndex = this.selectedFindings.length - 1 ;
     this.findingOptions.push(obj) ; 
     this.findingsInput.nativeElement.value = "" ;

     if(sctid){
      this.prescriptionService.getICD10Map(sctid).subscribe(data => {
          this.selectedFindings[this.currentFindingIndex].ICD_code = data.items[0].additionalFields.mapTarget;
      }); 
    }
  }

  removeFinding(index){
    if(!this.findingOptions[index].isLesion)
  	  this.findings.push(this.selectedFindings[index]);
    
  	this.selectedFindings.splice(index,1) ;
    this.findingOptions.splice(index,1) ;

    this.currentFindingIndex = 0 ;
    this.medTerms = [] ;

    if(this.selectedFindings.length)
      this.isLesionSelected = this.findingOptions[this.currentFindingIndex].isLesion ;
    else
      this.isLesionSelected = false ;
  }

  addFinding(value){
  	if(value){
      this.selectedFindings.push({conceptId : "-1" , term : value, med_term: "", ICD_code : ""}) ;
      this.noSearch = false ;
      this.findingsInput.nativeElement.value = "" ;

       const obj = {
        isLesion: this.isLesionSelected, 
        location : "",
        onset : "",
        severity : "",
        duration : "",
        distress_scale : 0,
        event_triggered : "",
        frequency : "",
        notes : "",
        examination_results : this.isLesionSelected ? {lesion_type : "" , lesion_shape : "" , lesion_color : "" , lesion_fluid : "" , lesion_sensation : "" , onTouch : "", subTerm: ""} : {}
      }
      this.findingOptions.push(obj) ;
      this.currentFindingIndex = this.selectedFindings.length - 1 ;
    }
  }

  selectMedTerm(value, index){
    const curMedTerm = this.selectedFindings[this.currentFindingIndex].med_term ;
    this.selectedFindings[this.currentFindingIndex].med_term = value ;
    this.medTerms[this.curTermPage].splice(index,1) ;

    if(curMedTerm){
      this.medTerms[this.curTermPage].push(curMedTerm) ;
    }
  }

  addOption(value , option){
    let index = this.currentFindingIndex ;
     if(index >= 0){
       const obj = {
         [option] : value
       }
       this.findingOptions[index] = {...this.findingOptions[index], ...obj} ;
       console.log(this.findingOptions[index]) ;

       if(option == 'location'){
        this.selectedModal++ ;
       }
     } 
  }

  removeExaminationOption(option, isExam){
    const index = this.currentFindingIndex ;
    if(isExam){
      this.findingOptions[index].examination_results[option] = "" ;
    }
    else{
      this.findingOptions[index][option] = "" ;
    }
  }

  addExaminationResult(value, option){
    let index = this.currentFindingIndex ;
    if(!this.isLesionSelected)
      return ;

    if(index >= 0){
      const obj = {
        [option] : value
      }
      this.findingOptions[index].examination_results = {...this.findingOptions[index].examination_results , ...obj} ;
      console.log(this.findingOptions[index].examination_results) ;
    }
  }

  createExaminationString(exam_obj){
    return JSON.stringify(exam_obj) ;
  }

  onComplete(){
  	let finalFindings = [];
  	for(let i=0; i<this.selectedFindings.length ; i++){
  		let val = {
  			  finding_name : this.selectedFindings[i].term + "|" + this.selectedFindings[i].med_term,
          finding_id : this.selectedFindings[i].conceptId + "|" + this.selectedFindings[i].ICD_code,
          duration : this.findingOptions[i].duration ,
          severity : this.findingOptions[i].severity,
          location : this.findingOptions[i].location,
          onset : this.findingOptions[i].onset,
          distress_scale : this.findingOptions[i].distress_scale,
          event_triggered : this.findingOptions[i].event_triggered,
          frequency : this.findingOptions[i].frequency ,
          notes : this.findingOptions[i].notes,
          examination_results : this.createExaminationString(this.findingOptions[i].examination_results) 
  		}

  		finalFindings.push(val) ;
  	}

  	const data_obj = {
  		_id : this.data._id ,
  		patient_id : this.data.patient_id , 
  		clinic_id : localStorage.getItem('clinicId'),
  		examination_findings : finalFindings
  	}
  	this.appointmentService.appointmentCreate(data_obj , 'patch').subscribe(result => {
  		this.data.examination_findings = finalFindings;
  		console.log('Finding Updated');
  	});
  }

  toggle(){
    if(this.currentClass){
      this.currentClass = "" ;
      this.prescriptionService.setSelected('examination_findings');
    }
    else{
      this.currentClass = "inner_content_div";
    }
  }


  setFinding(index){
    this.currentFindingIndex = index ;
    this.isLesionSelected = this.findingOptions[this.currentFindingIndex].isLesion ;
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


  collapsible(dropdown){

    let selectedDropdown: ElementRef ;

    dropdown !== 1 ? this.dropdown_btn_1.nativeElement.nextElementSibling.style.display = "none" : selectedDropdown = this.dropdown_btn_1 ;
    dropdown !== 2 ? this.dropdown_btn_2.nativeElement.nextElementSibling.style.display = "none" : selectedDropdown = this.dropdown_btn_2 ;
    dropdown !== 3 ? this.dropdown_btn_3.nativeElement.nextElementSibling.style.display = "none" : selectedDropdown = this.dropdown_btn_3 ;
    dropdown !== 4 ? this.dropdown_btn_4.nativeElement.nextElementSibling.style.display = "none" : selectedDropdown = this.dropdown_btn_4 ;
    dropdown !== 5 ? this.dropdown_btn_5.nativeElement.nextElementSibling.style.display = "none" : selectedDropdown = this.dropdown_btn_5 ;

     if(selectedDropdown.nativeElement.nextElementSibling.style.display === "block"){
        selectedDropdown.nativeElement.nextElementSibling.style.display = "none" ;
     }
     else{
       selectedDropdown.nativeElement.nextElementSibling.style.display = "block" ;
     }
  }

  onSubmit(){
    this.toggle();
     this.onComplete() ;
    this.tabChange.emit(1) ;
  }


}
