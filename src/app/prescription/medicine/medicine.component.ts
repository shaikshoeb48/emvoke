import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Debounce } from '../../core/decorators/debounce.decorator' ;
import { AppointmentService } from "../../appointment/appointment.service" ;
import { PrescriptionService } from '../prescription.service' ;

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  currentClass = "" ;
  showRight ;
  @Input() data ;	
  @Output() tabChange: EventEmitter<any> = new EventEmitter() ;
  @ViewChild("medicineValue") medicineInput: ElementRef ;
  noSearch = false  ;
  selectedMedicine = [] ;	
  medicine = [] ;
  medicineOption = [] ;
  currentMedicineIndex ;
  displayMedicine = [
  	{ _id : "-1" , name : "Paracetamol" , generic : "Paracetamol"},
  	{ _id: "-1" , name : "Crocin", generic : "Crocin" }
  ]; 

  afterCloseMedicine ;

  constructor(private prescriptionService: PrescriptionService, private appointmentService: AppointmentService) { }

  ngOnInit() {
  	if(this.data.medicines.length > 0){
  		this.createMedicineArray() ;
      this.currentMedicineIndex = 0 ;
  	}
    this.prescriptionService.selected.subscribe(selected => {
      if(selected === 'medicines')
        this.currentClass = "" ;
      else
        this.currentClass = "inner_content_div" ;

      this.showRight = (selected === 'medicines') ;
    });
  	console.log(this.data);
  }


  createMedicineArray(){
  	for(let medicine of this.data.medicines){
  		let obj = {
  			_id : medicine.medicine_id ,
  			name : medicine.medicine_name,
  			generic : ""
  		}

      let option = {
        route : medicine.route,
        quantity : medicine.quantity,
        quantity_type : medicine.quantity_type,
        frequency_notes: JSON.parse(medicine.frequency_notes),
        duration : JSON.parse(medicine.duration) ,
        notes : medicine.notes
      }
  	  this.selectedMedicine.push(obj) ;
      this.medicineOption.push(option);
  	}
  	this.medicine = [] ;
  	this.displayMedicine = [] ;
    console.log(this.medicineOption);
  }

  @Debounce(400)
  searchMedicine(value){
    document.getElementById('loader_med_id').style.display = 'block'
  	if(value.length > 3){
  		this.prescriptionService.searchMedicine(value).subscribe(data => {

        this.noSearch = false ;

        if(!data.Data){
          this.noSearch = true ;
          document.getElementById('loader_med_id').style.display = 'none'
          return ;
        }
        console.log(atob(data.Data));
  			const result = JSON.parse(atob(data.Data)) ;
	  		if(result.length){
	  			this.medicine = result ;
	  			this.noSearch = false ;
	  		}
	  		else{
	  			this.medicine = [] ;
	  			this.displayMedicine = [] ;
	  			this.noSearch = true ;
        }
        document.getElementById('loader_med_id').style.display = 'none'
	  	});
  	}else{
      document.getElementById('loader_med_id').style.display = 'none'
      }
  }

  selectMedicine(index){
  	if(this.medicine.length){
  		this.selectedMedicine.push(this.medicine[index]) ;
  		this.medicine.splice(index,1) ;
  	}
  	else{
  		this.selectedMedicine.push(this.displayMedicine[index]) ;
  		this.displayMedicine.splice(index,1) ;
  		this.medicine = [...this.displayMedicine] ;
  		this.displayMedicine = [] ;
  	}

    const obj = {
      	route : "" ,
        quantity : "",
        quantity_type : "",
        frequency_notes: {value: "", unit: "", time : ""},
        duration : {value : "", unit : ""},
        notes : ""
    }
    this.medicineOption.push(obj);
    this.currentMedicineIndex = this.selectedMedicine.length - 1 ;
    this.medicineInput.nativeElement.value = "" ;
  }

  removeMedicine(index){
  	this.medicine.push(this.selectedMedicine[index]);
  	this.selectedMedicine.splice(index,1) ;
    this.medicineOption.splice(index,1) ;
    this.currentMedicineIndex = 0 ;
  }

  addOption(value , option){
    let index = this.currentMedicineIndex ;
     if(index >= 0){
       const obj = {
         [option] : value
       }
       this.medicineOption[index] = {...this.medicineOption[index], ...obj} ;
       console.log(this.medicineOption[index]) ;
     } 
  }

  addMedicine(value){
  	if(value){
      this.selectedMedicine.push({ _id : "-1" , name : value}) ;
      this.noSearch = false ;
      this.medicineInput.nativeElement.value = "" ;
      const obj = {
          route : "" ,
          quantity : "",
          quantity_type : "",
          frequency_notes: {value: "", unit: "", time : ""},
          duration : {value : "", unit : ""},
          notes : ""
      }
      this.medicineOption.push(obj) ;
      this.currentMedicineIndex = this.selectedMedicine.length - 1 ;
    }
  }


  addDuration(value, key){
    let index = this.currentMedicineIndex ;
    if(key != -1){
      this.medicineOption[index].duration[key] = value ;
    }
    else{
      const val = value.split(' ') ;
      this.medicineOption[index].duration.value = val[0] ;
      this.medicineOption[index].duration.unit = val[1] ;
    }
    console.log(this.medicineOption[index]) ;
  }


  addFrequency(value, key){
    let index = this.currentMedicineIndex ;
    if(key != -1){
       this.medicineOption[index].frequency_notes[key] = value ;
    }
    else{
       const val = value.split(' ') ;
       this.medicineOption[index].frequency_notes.value = val[0] ;
       this.medicineOption[index].frequency_notes.unit = val[1] ;
    }
     console.log(this.medicineOption[index]) ;
  }

  onComplete(){
  	let finalMedicine = [];
  	for(let i=0 ; i<this.selectedMedicine.length; i++){
  		let val = {
  			medicine_name : this.selectedMedicine[i].name ,
  			medicine_id : this.selectedMedicine[i]._id ,
  			duration : JSON.stringify(this.medicineOption[i].duration) ,
  			notes : this.medicineOption[i].notes,
  			route : this.medicineOption[i].route,
      	quantity : this.medicineOption[i].quantity,
      	quantity_type : this.medicineOption[i].quantity_type,
      	frequency_notes : JSON.stringify(this.medicineOption[i].frequency_notes) ,
        
  		}

  		finalMedicine.push(val) ;
  	}

  	const data_obj = {
  		_id : this.data._id ,
  		patient_id : this.data.patient_id , 
  		clinic_id : localStorage.getItem('clinicId'),
  		medicines : finalMedicine
  	}
  	this.appointmentService.appointmentCreate(data_obj , 'patch').subscribe(result => {
  		this.data.medicines = finalMedicine;
  	});
  }

  setMedicine(index){
    this.currentMedicineIndex = index ;
  }

  toggle(){
    if(this.currentClass){
      this.currentClass = "" ;
      this.prescriptionService.setSelected('medicines');
    }
    else{
      this.currentClass = "inner_content_div";
    }
  }

  onSubmit(){
    this.toggle();
    this.onComplete() ;
    this.afterCloseMedicine = [...this.selectedMedicine] ;
    this.tabChange.emit(4) ;
  }



}
