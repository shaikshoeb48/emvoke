import { Component, OnInit, Input , Output , EventEmitter , ViewChild , ElementRef } from '@angular/core';
import { PrescriptionService } from '../prescription.service' ;
import { AppointmentService } from "../../appointment/appointment.service" ;
import { Debounce } from '../../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-investigations',
  templateUrl: './investigations.component.html',
  styleUrls: ['./investigations.component.scss']
})
export class InvestigationsComponent implements OnInit {

 currentClass = "" ;
 showRight ;	
 @Input() data ;
 @Output() tabChange: EventEmitter<any> = new EventEmitter() ;	
 @ViewChild("invesValue") invesInput: ElementRef ;
 noSearch = false  ;
 selectedInves = [] ;	
 investigations = [] ;
 invesOptions = [] ;
 currentInvesIndex ;
 displayInves = [
   	{conceptId : "390789009" , term : "Head lag"},
	{conceptId: "16331000" , term : "Heartburn" }
 ]; 

  constructor(private prescriptionService: PrescriptionService, private appointmentService: AppointmentService) { }

  ngOnInit() {
  	if(this.data.investigation.length > 0){
  		this.createInvesArray() ;
      this.currentInvesIndex = 0 ;
  	}
    this.prescriptionService.selected.subscribe(selected => {
      if(selected === 'investigation')
        this.currentClass = "" ;
      else
        this.currentClass = "inner_content_div" ;

      this.showRight = (selected === 'investigation');
      console.log(this.showRight, this.currentClass);
    });
   
  	console.log(this.data);
  }

  createInvesArray(){
	for(let inves of this.data.investigation){
  		let obj = {
  			conceptId : inves.investigation_id ,
  			term : inves.Investigation_name
  		}
       let option = {
       	 lab_name : inves.name,
       	 notes : inves.instructions ? JSON.parse(inves.instructions) : {nursing_notes : "", doctor_notes : ""} 
       }

  	  this.selectedInves.push(obj) ;
      this.invesOptions.push(option) ;
  	}
  	this.investigations = [] ;
  	this.displayInves = [] ;
  }

  @Debounce(400)
   searchInves(value){
	document.getElementById('loader_investigation_id').style.display = 'block'
  	if(value.length > 1){
  		this.prescriptionService.readPrescriptionData({term: value , semanticTag:'finding'}).subscribe(result => {
	  		if(result.items.length){
          let tempSymptoms = [] ;
          for(let val of result.items){
            const data = {conceptId : val.concept.conceptId, term : val.term} ;
            tempSymptoms.push(data) ;
          }
          this.investigations = tempSymptoms ;
          this.noSearch = false ;
        }
	  		else{
	  			this.investigations = [] ;
	  			this.displayInves = [] ;
	  			this.noSearch = true ;
			  }
			  document.getElementById('loader_investigation_id').style.display = 'none'
	  	});
  	}else{
		document.getElementById('loader_investigation_id').style.display = 'none'
	  }
  }

  selectInves(index){
  	if(this.investigations.length){
  		this.selectedInves.push(this.investigations[index]) ;
  		this.investigations.splice(index,1) ;
  	}
  	else{
  		this.selectedInves.push(this.displayInves[index]) ;
  		this.displayInves.splice(index,1) ;
  		this.investigations = [...this.displayInves] ;
  		this.displayInves = [] ;
  	}

     const obj = {
     	lab_name : "" ,
       	notes : { nursing_notes : "" , doctor_notes : ""}
     }

     this.currentInvesIndex = this.selectedInves.length - 1 ;
     this.invesOptions.push(obj) ; 
     this.invesInput.nativeElement.value = "" ;
  }

  removeInves(index){
  	this.investigations.push(this.selectedInves[index]);
  	this.selectedInves.splice(index,1) ;
    this.invesOptions.splice(index,1) ;

    this.currentInvesIndex = 0 ;
  }

   addInves(value){
  	if(value){
      this.selectedInves.push({conceptId : "-1" , term : value}) ;
      this.noSearch = false ;
      this.invesInput.nativeElement.value = "" ;

       const obj = {
         lab_name : "" ,
         notes : { nursing_notes : "" , doctor_notes : ""}
      }
      this.invesOptions.push(obj) ;
      this.currentInvesIndex = this.selectedInves.length - 1 ;
    }
  }

   addOption(value , option){
    let index = this.currentInvesIndex ;
     if(index >= 0){
       const obj = {
         [option] : value
       }
       this.invesOptions[index] = {...this.invesOptions[index], ...obj} ;
       console.log(this.invesOptions[index]) ;
     } 
  }

  addNotes(value , option){
  	let index = this.currentInvesIndex ;
  	if(index >= 0){
  		const obj = {
  			[option] : value
  		}
  	  this.invesOptions[index].notes = {...this.invesOptions[index].notes, ...obj} ;	
  	}
  }


   onComplete(){
  	let finalInves = [];
  	for(let i=0; i<this.selectedInves.length ; i++){
  		let val = {
  		  Investigation_name : this.selectedInves[i].term ,
          investigation_id : this.selectedInves[i].conceptId ,
          name : this.invesOptions[i].lab_name ,
          instructions : JSON.stringify(this.invesOptions[i].notes) 
  		}

  		finalInves.push(val) ;
  	}

  		const data_obj = {
  		_id : this.data._id ,
  		patient_id : this.data.patient_id , 
  		clinic_id : localStorage.getItem('clinicId'),
  		investigation : finalInves
  	}
  	this.appointmentService.appointmentCreate(data_obj , 'patch').subscribe(result => {
  		this.data.investigation = finalInves;
  		console.log('Investigations Updated');
  	});
  }


    toggle(){
	    if(this.currentClass){
	      this.currentClass = "" ;
	      this.prescriptionService.setSelected('investigation');
	    }
	    else{
	      this.currentClass = "inner_content_div";
	    }
	  }


	  setInves(index){
	    this.currentInvesIndex = index ;
	  }

	   onSubmit(){
	    this.toggle();
	     this.onComplete() ;
	    this.tabChange.emit(5) ;
	  }

}
