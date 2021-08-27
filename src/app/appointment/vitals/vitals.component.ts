import { Component, OnInit , Optional , Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA , MatDialogRef  } from '@angular/material/dialog' ;
import { AppointmentService } from '../appointment.service' ;

import { ClinicListComponent } from 'src/app/core/components/clinic-list/clinic-list.component' ;

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit {

  numberOfVitals: number ;		
  totalRows: number ;
  customVitals = [{name : 'Add Vital' , units : [] , value : '' , unit : ''}] ;
  numberOfCustomVitals: number ;
  vitals = [

  	{ name : 'Pulse' , units : ['Hz'] , value : '' , unit : ''},
  	{ name : 'Height' , units : ['cm' , 'm' , 'ft'] , value : '',  unit : ''},
  	{ name : 'Weight' , units : ['Kg' , 'g' , 'lbs'] , value : '' ,  unit : ''},
  	{ name : 'Systolic' , units : ['mmHg', 'atm' , 'Pa'] , value : '' ,  unit : ''},
  	{ name : 'Distolic' , units : ['mmHg' , 'atm' , 'Pa'] , value : '' ,  unit : ''},
  	{ name : 'SPO2', units : ['yo'] , value : '' ,  unit : ''},
  	{ name : 'Temprature' , units : ['C' , 'F' , 'K'] ,value : '' ,  unit : ''},
  	{ name : 'Sugar' , units : ['mg' , 'ml'], value : '' ,  unit : ''},
  	{ name : 'ECOG Score' , units : ['T'], value : '' ,  unit : ''},
  	{ name : 'CAT Score' , units : ['%'] , value : '' , unit : ''}

  ] ;

  // vitalText = "Pulse:10@Hz,Weight:70@Kg,Height:150@cm,Systolic:80@mmHg,Distolic:120@mm Hg,SPO2:10@N,Temprature:99@F,Sugar:200@ml,ECOG Score:30@yo,CAT Score:99@%" ;
  // vitalText = "Pulse:10@Hz,Weight:90@g,Temprature:99@F,|Depression:50@gf" ;	

     vitalText: string = '{"vitals":[{"name":"Pulse","value":30,"unit":"Hz"},{"name":"Height","value":1.58,"unit":"cm"},{"name":"Temprature","value":98,"unit":"F"}],"customVitals":[{"name":"abc","value":34,"unit":"g"}]}' ;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialog: MatDialog,
              private dialogRef: MatDialogRef<VitalsComponent> , private appointmentService: AppointmentService) { }

  ngOnInit() {

    if(this.dialogData){
      this.appointmentService.readAppointmentDetails(this.dialogData).subscribe(data => {
        const result = JSON.parse(atob(data.Data)) ;
        console.log(result.patient_vital) ;
        this.vitalText = result.patient_vital ? result.patient_vital : "" ;
        this.createVitals(this.vitalText) ;
        this.numberOfCustomVitals = this.customVitals.length ;
        this.totalRows = Math.ceil((this.numberOfVitals + this.numberOfCustomVitals) / 4) ;
      }, error => {});
      this.numberOfVitals = this.vitals.length ;
    }
    else{
      this.dialogRef.close('No Data Passed') ;
    }

  }

  onChangeValue(index, value) {
  	this.vitals[index].value = value ;
  }

  onChangeUnit(index, value) {
  	this.vitals[index].unit = value ;
  }

   onChangeCustomValue(index, value) {
    this.customVitals[index-this.numberOfVitals].value = value ;
  }

  onChangeCustomUnit(index, value) {
    this.customVitals[index-this.numberOfVitals].unit = value ;
  }


  onAddVital(){
    const dialogRef = this.dialog.open(ClinicListComponent , {
      width : '400px' ,  
      data : {
          title : 'Add Vital',
          isButton : true,
          button : 'Add Vital',
          input : true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const obj = {
          name : result ,
          units : [],
          value : '',
          unit : ''
        }
        this.customVitals.splice(this.numberOfCustomVitals-1 , 0 ,obj) ;
        this.numberOfCustomVitals++ ;
        this.totalRows = Math.ceil((this.numberOfVitals + this.numberOfCustomVitals) / 4) ;
      }
    });
  }

  createVitals(vitalText){
    if(vitalText){
      const vitalObj = JSON.parse(vitalText) ;
      const vitals = vitalObj.vitals ;
      const customVitals = vitalObj.customVitals ;

      for(let i=0; i<vitals.length; i++){
        for(let j=0; j<this.vitals.length ; j++){
          if(vitals[i].name === this.vitals[j].name){
            this.vitals[j].value = vitals[i].value ;
            this.vitals[j].unit = vitals[i].unit ;
            break ;
          }
        }
      }

      for(let obj of customVitals){
         this.customVitals.splice(this.customVitals.length - 1 , 0 , obj) ;
      }

      console.log(this.vitals) ;
      console.log(this.customVitals) ;
      }
  }


  // createVitals(vitalsText){

  // 	let vitalName = '' ;
  // 	let vitalValue = '' ;
  // 	let vitalUnit = '' ;
  //   let custom = false ;

  // 	let index = 0 ;
  // 	let cur = 1 ;
  //   let i = 0 ;

  // 	for(i=0; i<vitalsText.length; i++){
  		
  //     if(vitalsText[i] !== ',' && vitalsText[i] !== '@' && vitalsText[i] !== ':' && vitalsText[i] !== '|'){
  // 			if(cur === 1)	vitalName += vitalsText[i] ;
  // 			else if(cur === 2) vitalValue += vitalsText[i] ;
  // 			else if(cur === 3) vitalUnit += vitalsText[i] ;
  // 		}

  // 		else if(vitalsText[i] === ':') {
  // 			cur = 2 ;
  // 		}

  // 		else if(vitalsText[i] === '@') {
  // 			cur = 3 ;
  // 		}

  //     else if(vitalsText[i] === '|') {
  //       custom = true ;
  //     }

  // 		else if(vitalsText[i] === ',' && !custom && vitalName !== ''){

  // 		   while(vitalName != this.vitals[index].name) {
  // 		   	 index++ ;
  // 		   }

  // 		   this.vitals[index].value = vitalValue ;
  // 		   this.vitals[index].unit = vitalUnit ;

  // 			vitalName = '' ; 
  // 			vitalValue = '' ;
  // 			vitalUnit = '' ;
  // 			cur = 1 ;
  // 		}

  //     else if(vitalsText[i] === ',' && custom && vitalName !== ''){

  //       const obj = {
  //         name : vitalName ,
  //         value : vitalValue ,
  //         unit : vitalUnit,
  //         units : []
  //       }

  //       this.customVitals.splice(this.customVitals.length - 1 , 0 , obj) ;

  //       vitalName = '' ;
  //       vitalValue = '' ;
  //       vitalUnit = '' ;
  //       cur = 1 ;
  //     }
  // 	}

  //   // if(!custom && vitalsText.length > 0) {
  //   //   while(index < this.vitals.length && vitalName != this.vitals[index].name ) {
  //   //     index++ ;
  //   //  }

  //   //  this.vitals[index].value = vitalValue ;
  //   //  this.vitals[index].unit = vitalUnit ;
  //   // }
  //   // else
  //    if(custom){
  //      const obj = {
  //         name : vitalName ,
  //         value : vitalValue ,
  //         unit : vitalUnit,
  //         units : []
  //       }

  //       this.customVitals.splice(this.customVitals.length - 1 , 0 , obj) ;
  //   }
  
  // 	return ;

  // }

  createVitalText(){
    let finalVital = {
      vitals : [] ,
      customVitals : []
    }

    for(let vital of this.vitals){
     if(vital.value){
        let obj = {
          name : vital.name ,
          value : vital.value,
          unit : vital.unit
        }

        finalVital.vitals.push(obj) ;
     }
    }

    for(let vital of this.customVitals){
      if(vital.value){
        let obj = {
          name : vital.name ,
          value : vital.value ,
          unit : vital.unit
        }

        finalVital.customVitals.push(obj) ;
      }
    }
    console.log(finalVital) ;
    return JSON.stringify(finalVital) ;
  }

  // createVitalText(){
  // 	let vitalText = "" ;
  // 	for(let i=0 ; i<this.numberOfVitals ; i++){
  // 		if(this.vitals[i].value !== ''){
  // 			vitalText += this.vitals[i].name ;
	 //  		vitalText += ':' ;

	 //  		vitalText += this.vitals[i].value ;
	 //  		vitalText += '@' ;

	 //  		vitalText += this.vitals[i].unit ;
	 //  		vitalText += ',' ;
  // 		}
  // 	}

  //   if(this.numberOfCustomVitals-1 > 0) {
  //     vitalText += '|' ;

  //     for(let i=0 ; i<this.numberOfCustomVitals-1; i++) {
  //       vitalText += this.customVitals[i].name ;
  //       vitalText += ':' ;

  //       vitalText += this.customVitals[i].value ;
  //       vitalText += '@' ;

  //       vitalText += this.customVitals[i].unit ;
  //       vitalText += (i < this.numberOfCustomVitals - 2) ? ',' : '' ;
  //     }
  //   }

  // 	return vitalText ;
  // }

  onSubmitVitals(){
  	const updatedVitalText = this.createVitalText() ;
    const data_obj = {
      _id : this.dialogData.appointment_id,
      patient_id: this.dialogData.patient_id,
      patient_vital : updatedVitalText,
      clinic_id : localStorage.getItem('clinicId')
    }
    this.appointmentService.appointmentCreate(data_obj, 'patch').subscribe(result => {
      this.dialogRef.close('Vitals Submitted');
    }, error => {}) ;
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
// BMI
// Waist
// Hip
// PEFRL
// Body Fat
// Upper Segment
// Lower Segment
// Arm Span
// Sitting Height
// Height 
// EGFR
// Diastolic (Rt)
// HgDiastolic (Lt)
// HgSystolic (Rt)
// HgSystolic (Lt)
// HgMUAC
// ECOG Score
// CAT Score
// ACT Score
// BSAm²HGT
// dlSystolic (Lying)
// HgDiastolic (Lying)
// HgSystolic (Standing)
// HgDiastolic (Standing)