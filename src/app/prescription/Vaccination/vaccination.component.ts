import { Component, OnInit } from '@angular/core';
import { VaccinationService } from './vaccination.service'
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { VaccinemodalComponent } from '../../core/components/vaccinemodal/vaccinemodal.component';
import { SelectvaccinemodalComponent } from '../../core/components/selectvaccinemodal/selectvaccinemodal.component';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {
  selection = 'adult';
  selected_date;
  given=false;
  base_date;
  date;
  allVaccines = [];
  adultVaccines = [];
  childVaccines = [];
  checkdates=[];
  checkvaccines=[];
  pregnancyChart = [];
  times = [];
  common_vaccines=[];
  travelChart = [];
  given_vaccines=[];
  patient_data;
  date_time = [0, 1, 2, 4, 6, 9, 12, 15, 18, 19, 24, 48, 84, 132, 156, 192, 204];
  appointment_data;

  filter = true ;
  all_filter = true ;

  patient_patch_array=[];
  appointment_patch = {
    "_id": localStorage.getItem('appointment_id'),
    "patient_id": localStorage.getItem('patient_id'),
    "clinic_id": localStorage.getItem('clinicId'),
    "vaccines" : [
    ]
    }

    patient_patch = {
        "_id": localStorage.getItem('patient_id'),
        "vaccines_given_or_due" : []
      }


  constructor(private vaccineService: VaccinationService, private dialog: MatDialog, private datepipe: DatePipe) { }

  ngOnInit() {
    let all_vaccines=[];
    this.adultVaccines = this.vaccineService.adult;
    // this.childVaccines = this.vaccineService.child;
    this.pregnancyChart = this.vaccineService.pregnancyChart;
    this.travelChart = this.vaccineService.travel;

    this.vaccineService.newVaccineSource.forEach((element:any) => {
      if (element.category.includes('child')) {
        this.childVaccines.push(element);
      }
    });
    this.vaccineService.getPatientVaccinesDetails().subscribe(result => {
      const data = JSON.parse(atob(result.Data)) ;
      this.patient_data = data;
      this.allVaccines = this.patient_data.vaccines_given_or_due;
      all_vaccines = this.patient_data.vaccines_given_or_due;

    this.common_vaccines = [];
    this.allVaccines.forEach(ele => {
        if((this.common_vaccines.findIndex(element => (element.name == ele.vaccine_id)) == -1)){
          let vaccineObject = {
            "name":"",
            "options":[],
            "dates":[]
          };
          this.vaccineService.newVaccineSource.forEach(vaccine => {
            if(vaccine.name == ele.vaccine_id){
             vaccineObject.options = vaccine.options;
             vaccineObject.dates.push(ele.date_vaccine_given_due);
             vaccineObject.name = ele.vaccine_id;
            }
          });

          this.common_vaccines.push(vaccineObject);
          vaccineObject = {
            "name":"",
            "options":[],
            "dates":[]
          };
        } else{
         // console.log(ele,this.common_vaccines,'chekcinggggggggggg')
          this.common_vaccines.forEach(common_element => {
            if(common_element.name==ele.vaccine_id){
              common_element.dates.push(ele.date_vaccine_given_due);
            }
          });
        }
    });

      this.patient_data.vaccines_given_or_due.forEach(element => {
        if(element.status=="G"){
          let given_vaccine = {
            "vaccine_id":element.vaccine_id,
            "vaccine":null,
            "date":element.date_vaccine_given_due
          }
          this.given_vaccines.push(given_vaccine);
        }
      });
      if(this.patient_data.vaccines_given_or_due.length > 0 ){
        let d=new Date(Date.parse(this.patient_data.vaccines_given_or_due[0].date_vaccine_given_due));
        let dateobject = {
          "value":d
        }
        this.onDateChange(dateobject);
      }


      //here ondatechange
    });
  }

  setFilter(value, all){
    if(!all){
      this.filter = value ;
      this.all_filter = false ;
    }
    else
      this.all_filter = true ;
  }

  selectHandler(e) {
    console.log(e);
    this.selection = e.target.value;
    console.log(this.selection);
  }

  public onDateChange($event) {
    console.log($event.value,'dateeeee')
    const tempdate = $event.value;

    this.childVaccines.forEach(element => {
      let date = '';
      let wastedate = '';
      let dates = [];
      let k = 0, i = 0;
      for (i; i < this.date_time.length; i++) {
        if (this.date_time[i] == element.time[k]) {
          date = this.datepipe.transform(this.add_months(tempdate, element.time[k]), 'yyyy-MM-dd');
          dates.push(date);
          wastedate = this.datepipe.transform(this.sub_months(tempdate, element.time[k]), 'yyyy-MM-dd');
          k++;
        } else {
          dates.push('');
        }
      }
      element.dates = dates;
    });


  }

  add_months(dt, n) {//function for adding  months to a date
      return new Date(dt.setMonth(dt.getMonth() + n));
  }

  sub_months(dt, n) {//function for subtracting  months to a date
    return new Date(dt.setMonth(dt.getMonth() - n));
}

  public removeVaccine(vaccine) {
    console.log(vaccine);
    this.childVaccines.splice(this.childVaccines.findIndex(function (i) {
      return i.name === vaccine.name;
    }), 1);

  }

  public openVaccineDialog(vaccine, date) {
    console.log(date)
    const dialogref = this.dialog.open(SelectvaccinemodalComponent, {
      width: '500px',
      data: {
        vaccines: vaccine,
      }
    });
    dialogref.afterClosed().subscribe(result => {
      //console.log(result);
      if(result){
        const data = {"vaccine_id": vaccine.name,
        "vaccine_name": result.option_name,
        "status": "G",
        "date_vaccine_given":date,
        "notes": "xyz"}

        this.appointment_patch.vaccines.push(data);
        this.vaccineService.updateAppointment(this.appointment_patch).subscribe(data=> {
          console.log(data);
        })
        this.childVaccines.forEach(element => {
          if(element.name == vaccine.name){
            let given_vaccine = {
              "vaccine_id":vaccine.name,
              "vaccine":result.option_name,
              "date":date
            }
            this.given_vaccines.push(given_vaccine);
          }
        });
        this.patient_patch_array = [];
        this.childVaccines.forEach(element => {
          element.dates.forEach(date => {
            if(date != ''){
            const patient_vaccine = {
              "vaccine_id": element.name,
              "vaccine_name": null,
              "status": this.checkGivenVaccine(element.name,date)?"G":"D",
              "date_vaccine_given_due":date,
              "notes": "xyz"
            }

            this.patient_patch_array.push(patient_vaccine);
            }
          });
        });
        console.log(this.patient_patch_array,'laaaaaa')
        this.patient_patch.vaccines_given_or_due = this.patient_patch_array;
        this.vaccineService.updatePatientVaccinations(this.patient_patch).subscribe(data => {
          console.log(data,'patient_patch_response');
        })
      }
    }); // dialog close
  }

  checkGivenVaccine (vaccine_name, date) {
    return (this.given_vaccines.findIndex(element => (element.vaccine_id == vaccine_name) && (element.date == date)) != -1) ? true : false;
  }

  openModal() {
    console.log(this.selection);
    const dialogref = this.dialog.open(VaccinemodalComponent, {
      width: '500px',
      data: {
        category: this.selection,
      }
    });
    dialogref.afterClosed().subscribe(result => {
      //console.log(result);
      if (!result) {
        return;
      }
      else {
        if (this.selection === 'adult') {
          result.forEach(selectedVaccine => {
            this.adultVaccines.push({ name: `${selectedVaccine}` });
          });
        }
        else if (this.selection === 'child') {

          result.forEach(selectedVaccine => {
            this.childVaccines.push({ name: `${selectedVaccine}` });
          });
        }
        else if (this.selection === 'pregnancy') {
          result.forEach(selectedVaccine => {
            this.pregnancyChart.push({ name: `${selectedVaccine}` });
          });
        }
        else if (this.selection === 'travel') {
          result.forEach(selectedVaccine => {
            this.travelChart.push({ name: `${selectedVaccine}` });
          });
        }
        else if (this.selection === 'all-vaccines') {
          result.forEach(selectedVaccine => {
            this.allVaccines.push({ name: `${selectedVaccine}` });
          });
        }
      }

    }); // dialog close

  }  // openModal function close

}
