import { Component, OnInit, Input , Output , ViewChild , ElementRef , EventEmitter } from '@angular/core';
import { PrescriptionService } from '../prescription.service' ;
import { AppointmentService } from "../../appointment/appointment.service" ;
import { Debounce } from '../../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss']
})
export class ProceduresComponent implements OnInit {

 currentClass = "" ;
 showRight ;	
 @Input() data ;
 @Output() tabChange: EventEmitter<any> = new EventEmitter() ;	
 @ViewChild("procedureValue") procedureInput: ElementRef ;
 noSearch = false  ;
 selectedProcedure = [] ;	
 procedures = [] ;
 procedureOptions = [] ;
 currentProcedureIndex ;
 displayProcedure = [
   	{conceptId : "390789009" , term : "Head lag"},
	{conceptId: "16331000" , term : "Heartburn" }
 ]; 

  constructor(private prescriptionService: PrescriptionService, private appointmentService: AppointmentService) { }

  ngOnInit() {
  	if(this.data.procedures.length > 0){
  	  this.createProcedureArray() ;
      this.currentProcedureIndex = 0 ;
  	}
    this.prescriptionService.selected.subscribe(selected => {
      if(selected === 'procedures')
        this.currentClass = "" ;
      else
        this.currentClass = "inner_content_div" ;

      this.showRight = (selected === 'procedures');
    });
   
  	console.log(this.data);
  }

  createProcedureArray(){
	for(let procedure of this.data.procedures){
  		let obj = {
  			conceptId : procedure.procedure_id ,
  			term : procedure.procedure_name
  		}
       let option = {
       	 notes : procedure.notes ? JSON.parse(procedure.notes) : {nursing_notes : "", patient_notes : ""} 
       }

  	  this.selectedProcedure.push(obj) ;
      this.procedureOptions.push(option) ;
  	}
  	this.procedures = [] ;
  	this.displayProcedure = [] ;
  }


  @Debounce(400)
  searchProcedure(value){
	document.getElementById('loader_procedure_id').style.display = 'block'
  	if(value.length > 1){
  		this.prescriptionService.readPrescriptionData({term: value , semanticTag:'procedure'}).subscribe(result => {
	  		if(result.items.length){
          let tempSymptoms = [] ;
          for(let val of result.items){
            const data = {conceptId : val.concept.conceptId, term : val.term} ;
            tempSymptoms.push(data) ;
          }
          this.procedures = tempSymptoms ;
          this.noSearch = false ;
        }
	  		else{
	  			this.procedures = [] ;
	  			this.displayProcedure = [] ;
	  			this.noSearch = true ;
			  }
			  document.getElementById('loader_procedure_id').style.display = 'none'
	  	});
  	}else{
		document.getElementById('loader_procedure_id').style.display = 'none'
		}
  }

  selectProcedure(index){
  	if(this.procedures.length){
  		this.selectedProcedure.push(this.procedures[index]) ;
  		this.procedures.splice(index,1) ;
  	}
  	else{
  		this.selectedProcedure.push(this.displayProcedure[index]) ;
  		this.displayProcedure.splice(index,1) ;
  		this.procedures = [...this.displayProcedure] ;
  		this.displayProcedure = [] ;
  	}

     const obj = {
     	lab_name : "" ,
       	notes : { nursing_notes : "" , patient_notes : ""}
     }

     this.currentProcedureIndex = this.selectedProcedure.length - 1 ;
     this.procedureOptions.push(obj) ; 
     this.procedureInput.nativeElement.value = "" ;
  }

  removeProcedure(index){
  	this.procedures.push(this.selectedProcedure[index]);
  	this.selectedProcedure.splice(index,1) ;
    this.procedureOptions.splice(index,1) ;

    this.currentProcedureIndex = 0 ;
  }

   addProcedure(value){
  	if(value){
      this.selectedProcedure.push({conceptId : "-1" , term : value}) ;
      this.noSearch = false ;
      this.procedureInput.nativeElement.value = "" ;

       const obj = {
         lab_name : "" ,
         notes : { nursing_notes : "" , patient_notes : ""}
      }
      this.procedureOptions.push(obj) ;
      this.currentProcedureIndex = this.selectedProcedure.length - 1 ;
    }
  }

   addOption(value , option){
    let index = this.currentProcedureIndex ;
     if(index >= 0){
       const obj = {
         [option] : value
       }
       this.procedureOptions[index] = {...this.procedureOptions[index], ...obj} ;
       console.log(this.procedureOptions[index]) ;
     } 
  }

  addNotes(value , option){
  	let index = this.currentProcedureIndex ;
  	if(index >= 0){
  		const obj = {
  			[option] : value
  		}
  	  this.procedureOptions[index].notes = {...this.procedureOptions[index].notes, ...obj} ;	
  	}
  }


   onComplete(){
  	let finalProcedure = [];
  	for(let i=0; i<this.selectedProcedure.length ; i++){
  		let val = {
  		  procedure_name : this.selectedProcedure[i].term ,
          procedure_id : this.selectedProcedure[i].conceptId ,
          notes : JSON.stringify(this.procedureOptions[i].notes) 
  		}

  		finalProcedure.push(val) ;
  	}

  		const data_obj = {
  		_id : this.data._id ,
  		patient_id : this.data.patient_id , 
  		clinic_id : localStorage.getItem('clinicId'),
  		procedures : finalProcedure
  	}
  	this.appointmentService.appointmentCreate(data_obj , 'patch').subscribe(result => {
  		this.data.procedures = finalProcedure;
  		console.log('procedure Updated');
  	});
  }


    toggle(){
	    if(this.currentClass){
	      this.currentClass = "" ;
	      this.prescriptionService.setSelected('procedures');
	    }
	    else{
	      this.currentClass = "inner_content_div";
	    }
	  }


	  setProcedure(index){
	    this.currentProcedureIndex = index ;
	  }

	   onSubmit(){
	    this.toggle();
	     this.onComplete() ;
	    this.tabChange.emit(6) ;
	  }

}
