import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DATA } from "./server-data-json"
import { OTHER_DATA } from './server-data-json'
import { PrescriptionService } from '../../prescription.service';
import { Subscription } from 'rxjs';
import { GrowthService } from '../growth.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppointmentService } from 'src/app/appointment/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { VitalsoverwriteconfirmComponent } from './vitalsoverwriteconfirm/vitalsoverwriteconfirm.component';
import { DatePipe } from '@angular/common';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})

export class ExaminationComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private growthService: GrowthService,
    private notification: NotificationService,
    private appointmentService: AppointmentService,
    public dialog: MatDialog,
    private datepipe: DatePipe) { }

  data = {};
  other = OTHER_DATA;
  patDataServ: Subscription  = Subscription.EMPTY;
  patchData = {};
  examinationData = {}
  activeTab = 'one';
  formStatus = {
    "threeMonthsForm": {
      "id": "one",
      "tabName": "3 Months",
      "status": "false",
      "vitalsMonthValue": 3,
      "monthAndYear":null

    },
    "sixMonthsForm": {
      "id": "two",
      "tabName": "6 Months",
      "status": "false",
      "vitalsMonthValue": 6,
      "monthAndYear":null

    },
    "nineMonthsForm": {
      "id": "three",
      "tabName": "9 Months",
      "status": "false",
      "vitalsMonthValue": 9,
      "monthAndYear":null


    },

    "twelveMonthsForm": {
      "id": "four",
      "tabName": "12 Months",
      "status": "false",
      "vitalsMonthValue": 12,
      "monthAndYear":null


    },

    "eighteenMonthsForm": {
      "id": "five",
      "tabName": "18 Months",
      "status": "false",
      "vitalsMonthValue": 18,
      "monthAndYear":null


    },

    "threeYearsForm": {
      "id": "six",
      "tabName": "3 Years",
      "status": "false",
      "vitalsMonthValue": 36,
      "monthAndYear":null


    },

    "fiveYearsForm": {
      "id": "seven",
      "tabName": "5 Years",
      "status": "false",
      "vitalsMonthValue": 60,
      "monthAndYear":null


    }
  }
  examinationForm: FormGroup = this.fb.group({});
  formNames: any[] = ["threeMonthsForm", "sixMonthsForm", "nineMonthsForm", "twelveMonthsForm", "eighteenMonthsForm", "threeYearsForm", "fiveYearsForm"]
  developmentDate = [
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    []
  ]
  milestoneContent = {
    "threeMonthsForm": {},
    "sixMonthsForm": {},
    "nineMonthsForm": {},
    "twelveMonthsForm": {},
    "eighteenMonthsForm": {},
    "threeYearsForm": {},
    "fiveYearsForm": {}
  }
  selectedArray = [true, false, false, false, false, false, false]
  savedData = {}
  milestoneNames = this.other.milestones
  teethChartHeader = this.other.teethChart.headers
  teethChartRows = this.other.teethChart.rows
  pushedDevelopmentItems: any[] = [];
  appointment_id;
  patient_id;
  requiredVitals = ["weight", "height", "ofc"]
  vitals = {
    "data": {
      "weight": {
        "value": null,
        "unit": null
      },
      "height": {
        "value": null,
        "unit": null
      },
      "ofc": {
        "value": null,
        "unit": null
      }
    },
    "appointmentMonth": null,
    "appointmentDate": null,
    "vitalsDate": null

  }
  vitalsOverwrite = false;

  ngOnInit() {

    this.getVitals();
    this.getChildData()
  }

  //get data from backend to patch with development forms
  getChildData() {

    this.growthService.getPatientChildDevelopmentFormData().subscribe((result) => {
      this.patchData = JSON.parse(atob(result.Data))
      if (this.patchData["child_specific_development_examination_form"] != null && this.patchData["child_specific_development_examination_form"].length >0) {
        this.examinationData = { ...JSON.parse(this.patchData["child_specific_development_examination_form"]) }
        this.savedData["examinationForm"] = this.examinationData
        this.teethChartRows = JSON.parse(this.patchData["child_specific_teeth_chart"])
      }
      if (this.patchData["child_specific_milestone_content"]!=null && Object.keys(this.patchData["child_specific_milestone_content"]).length > 0) {
        let csmc = JSON.parse(this.patchData["child_specific_milestone_content"])
        for (let i in this.formNames) {
          if (this.formNames[i] in csmc) {
            this.milestoneContent[this.formNames[i]] = csmc[this.formNames[i]]
          }
        }
      }
      this.data["threeMonthsForm"] = JSON.parse(JSON.stringify(DATA["threeMonthsForm"]));
      this.onCreateForm("threeMonthsForm")
      this.onCreateDevelopmentDate();
    })

  }



  //get ofc,weight,height from vitals
  getVitals() {
    this.patient_id = localStorage.getItem('patient_id')
    this.appointment_id = localStorage.getItem('appointment_id')
    const object = {
      'patient_id': this.patient_id,
      'appointment_id': this.appointment_id
    }
    this.appointmentService.readAppointmentDetails(object).subscribe((data) => {
      const rawData = atob(data.Data)
      if (rawData.length) {
        let appDet = JSON.parse(rawData)
        this.vitals.appointmentDate = appDet.appointment_date
        let patientDob = appDet.patient_dob
        this.onCalculateMonthTobeFilled(patientDob)
        let appointmentMonthTemp = this.findDateDiff(new Date(patientDob), new Date(this.vitals.appointmentDate))
        let appointmentMonth = Math.floor(appointmentMonthTemp / 3) * 3
        let vitalsArray = []
        this.growthService.getChildGrowthData().subscribe((data) => {
          const rawData = atob(data.Data)
          if (rawData) {
            let growthChildData = JSON.parse(rawData)
            growthChildData.forEach((v) => {
              let vitalMonth = this.findDateDiff(new Date(patientDob), new Date(v.appointment_date))
              if (vitalMonth == appointmentMonth) {
                vitalsArray.push(v)
              }
            })
            if (vitalsArray.length) {
              const sortedVitalsArray = vitalsArray.sort((a, b) => {
                return new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime()
              })
              const reqVitals = sortedVitalsArray[0]
              this.requiredVitals.forEach((v) => {
                if (reqVitals[v] !== null) {
                  this.vitals.data[v].value = reqVitals[v].value
                  this.vitals.data[v].unit = reqVitals[v].unit
                }
              })
              this.vitals.vitalsDate = reqVitals.appointment_date
              Object.keys(this.formStatus).forEach((data) => {
                if (this.formStatus[data].vitalsMonthValue == appointmentMonth) {
                  this.vitals.appointmentMonth = data
                }
              })
            }
          }
        })
      }
    })
  }

  //returns month and year in (MMM-YYYY) format specifying when the form to be  filled
  onCalculateMonthTobeFilled(patientDob){
    let dob = moment(patientDob).format("YYYY-MM-DD")
    Object.keys(this.formStatus).forEach((m) =>{
      this.formStatus[m].monthAndYear= moment(dob).add(this.formStatus[m].vitalsMonthValue, 'M').format('MMM-YYYY')
    })
  }

  //get months from DOB till appointment date
  findDateDiff(start, end) {
    const totalMilliSec = end.getTime() - start.getTime();
    const totalDays = (totalMilliSec / (1000 * 3600 * 24));
    const monthCounts = Math.round(totalDays / 30);
    // const requiredMonth = Math.floor(monthCounts / 3) * 3;
    return monthCounts;
  }

  shareCheckedList(item: any[], formName, category) {
    if (this.milestoneContent[formName] == undefined) {
      this.milestoneContent[formName] = {}
    }
    this.milestoneContent[formName][category] = item
  }

  //load json form from server-data-json file
  onLoadForm(formName, index) {
    if (this.selectedArray[index] == false) {
      this.selectedArray[index] = true
      this.data[formName] = JSON.parse(JSON.stringify(DATA[formName]))
      this.onCreateForm(formName)
    }
  }

  //create form using reactive form approach
  onCreateForm(formName) {
    this.examinationForm.addControl(formName, this.fb.group({}))
    let control = this.examinationForm.get(formName) as FormGroup;
    let formIndex = this.formNames.indexOf(formName)
    let sectionOneItems = this.data[formName].section_one
    sectionOneItems.forEach((data) => {
      control.addControl(data.formName, new FormControl(null))
      if ("unit" in data) {
        control.addControl(data.unit.formName, new FormControl(null))

      }
    })
    let developmentItems = this.data[formName].section_two
    let developmentForm = this.fb.group({})
    developmentItems.forEach((data) => {
      let singleDevelopmentForm = this.onCreateSingleDevelopmentForm(formIndex)
      developmentForm.addControl(data.name, singleDevelopmentForm)
    })
    control.addControl('development', developmentForm)
    control.addControl('status', new FormControl('false'))
    control.addControl('saveDate', new FormControl(moment()))
    if (Object.keys(this.patchData).length > 0) {
      this.onPatchForm(formName)
    }

  }

  //patch the data to form depending upon the month clicked
  onPatchForm(formName) {
    if (Object.keys(this.examinationData).length > 0) {
      Object.keys(this.examinationData).forEach((i) => {
        this.formStatus[i].status = this.examinationData[i].status
      })

      let formIndex = this.formNames.indexOf(formName);
      let tempDevelopmentItems = []
      for (let i = 0; i < formIndex; i++) {
        tempDevelopmentItems.push(...DATA[this.formNames[i]].section_two)
      }

      if (formIndex > 0) {
        let previousForm = this.formNames[formIndex - 1]
        if (previousForm in this.examinationData) {
          let developmentData = this.examinationData[previousForm].development
          let control = this.examinationForm.get(formName).get('development') as FormGroup;
          Object.keys(developmentData).forEach((item) => {
            if (developmentData[item]['fetchIndex'] == formIndex && developmentData[item]['carry'] == 'yes') {
              let t = tempDevelopmentItems.filter((developmentItems) => {
                return developmentItems.name == item
              })[0]
              if (!(control.get(item))) {
                this.data[formName].section_two.push(t)
                let singleDevelopmentForm = this.onCreateSingleDevelopmentForm(formIndex)
                control.addControl(item, singleDevelopmentForm)
              }
            }
          })
        }
      }
      if (formName in this.examinationData) {
        let singleFormUserData = this.examinationData[formName]
        this.examinationForm.get(formName).patchValue(singleFormUserData)
        let formSaveDate = this.datepipe.transform(new Date(this.examinationForm.get(formName).get('saveDate').value), 'dd-MM-yyyy')
        let today = this.datepipe.transform(new Date(), 'dd-MM-yyyy')
        if (formSaveDate != today) {
          this.examinationForm.get(formName).get('saveDate').disable()
          this.onDisableVitals(formName)
        }
      }
      else if (this.vitals.appointmentMonth != null) {
        if (formName == this.vitals.appointmentMonth && this.formStatus[formName].status == 'false') {
          this.examinationForm.get(formName).get('weight').setValue(this.vitals.data.weight.value)
          this.examinationForm.get(formName).get('weightUnit').setValue(this.vitals.data.weight.unit)
          this.examinationForm.get(formName).get('height').setValue(this.vitals.data.height.value)
          this.examinationForm.get(formName).get('heightUnit').setValue(this.vitals.data.height.unit)
          this.examinationForm.get(formName).get('ofc').setValue(this.vitals.data.ofc.value)
          this.examinationForm.get(formName).get('ofcUnit').setValue(this.vitals.data.ofc.unit)
        }
      }

      this.onCheckMilestoneContentToDisplay(formName);
    }
    else if (this.vitals.appointmentMonth != null) {
      if (formName == this.vitals.appointmentMonth && this.formStatus[formName].status == 'false') {
        this.examinationForm.get(formName).get('weight').setValue(this.vitals.data.weight.value)
        this.examinationForm.get(formName).get('weightUnit').setValue(this.vitals.data.weight.unit)
        this.examinationForm.get(formName).get('height').setValue(this.vitals.data.height.value)
        this.examinationForm.get(formName).get('heightUnit').setValue(this.vitals.data.height.unit)
        this.examinationForm.get(formName).get('ofc').setValue(this.vitals.data.ofc.value)
        this.examinationForm.get(formName).get('ofcUnit').setValue(this.vitals.data.ofc.unit)
      }
    }
  }

  //When old vitals are patched in a form,then vitalsUnits are diabled if not today so that it cannot be modified
  onDisableVitals(form){
    if (this.examinationForm.get(form).get('weightUnit').value !== null && this.examinationForm.get(form).get('weightUnit').value.length >0) {
      this.examinationForm.get(form).get('weightUnit').disable()
    }
    if (this.examinationForm.get(form).get('heightUnit').value !== null) {
      this.examinationForm.get(form).get('heightUnit').disable()
    }
    if (this.examinationForm.get(form).get('ofcUnit').value !== null) {
      this.examinationForm.get(form).get('ofcUnit').disable()
    }

  }

  //check if milestones are checked,if yes then slice it for next months
  onCheckMilestoneContentToDisplay(formName) {
    let formIndex = this.formNames.indexOf(formName)
    let previousMotor = []
    let previousComm = []
    let previousSoc = []
    let previousCog = []
    for (let i = 0; i < formIndex; i++) {
      let content = this.milestoneContent[this.formNames[i]]
      if (content["motor"] !== undefined) {
        previousMotor.push(...content["motor"])
      }
      if (content["communication"] !== undefined) {
        previousComm.push(...content["communication"])
      }
      if (content["social"] !== undefined) {
        previousSoc.push(...content["social"])
      }
      if (content["cognitive"] !== undefined) {
        previousCog.push(...content["cognitive"])
      }
    }

    if (previousMotor.length > 0) {
      let x = [...this.data[formName]["section_three"]["motor"]]
      previousMotor.filter((ra) => {
        x = x.filter((data) => {
          return data.name !== ra.name
        })
      })
      this.data[formName]["section_three"]["motor"] = x
    }
    if (previousComm.length > 0) {
      let x = [...this.data[formName]["section_three"]["communication"]]
      previousComm.filter((ra) => {
        x = x.filter((data) => {
          return data.name !== ra.name
        })
      })
      this.data[formName]["section_three"]["communication"] = x
    }
    if (previousSoc.length > 0) {
      let x = [...this.data[formName]["section_three"]["social"]]
      previousSoc.filter((ra) => {
        x = x.filter((data) => {
          return data.name !== ra.name
        })
      })
      this.data[formName]["section_three"]["social"] = x
    }
    if (previousCog.length > 0) {

      let x = [...this.data[formName]["section_three"]["cognitive"]]
      previousCog.filter((ra) => {
        x = x.filter((data) => {
          return data.name !== ra.name
        })
      })
      this.data[formName]["section_three"]["cognitive"] = x
    }
  }

  //check if vitals from appointment is being changed in examination form
  onChangeValue(item, singleExam) {
    let form = singleExam.key
    if (form == this.vitals.appointmentMonth && this.formStatus[form].status == "false") {
      if (this.requiredVitals.includes(item.formName)) {
        if (!this.vitalsOverwrite && this.examinationForm.get(form).get(item.formName).value != null ) {
          const object = {
            examinationSaved:false,
            date: this.datepipe.transform(this.vitals.vitalsDate, "dd-MM-yyyy"),
            patient_id:this.patient_id,
            appointment_id:this.appointment_id
          }
          this.openDialog(object);
        }
      }
    }
    if(this.formStatus[form].status == "true" && this.examinationForm.get(form).get(item.formName).value != null){
    let formSaveDate = this.datepipe.transform(this.examinationForm.get(form).get('saveDate').value,"dd-MM-yyyy")
    let today = this.datepipe.transform(new Date(),"dd-MM-yyyy")

    if(formSaveDate != today){
      const object = {
        examinationSaved:true,
        patient_id:this.patient_id,
        appointment_id:this.appointment_id
      }
      this.openDialog(object);
    }
    }
  }

  //opens vitalsoverwriteconfirm component
  openDialog(object): void {
    let dialogRef = this.dialog.open(VitalsoverwriteconfirmComponent, {
      height: '300px',
      width: '700px',
      data: object
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vitalsOverwrite = result;
      }
      else {
        this.vitalsOverwrite = false;

      }
    });
  }

  //returns years from DOB till date
  onCreateDevelopmentDate() {
    this.patDataServ = this.prescriptionService.patientDataVal.subscribe((data) => {
      let d = new Date();
      let currentYear = d.getFullYear();
      let date = data.date_of_birth
      date = parseInt(date)
      let limit = currentYear - date + 1;
      for (let i = 0; i < limit; i++) {
        this.developmentDate[1].push(date);
        date += 1;
      }
    })
  }

  //creates reactive form for development in section 2 of server-data-json file
  onCreateSingleDevelopmentForm(formIndex) {
    let singleDevelopmentForm = this.fb.group({})
    singleDevelopmentForm.addControl('val', new FormControl(null))
    singleDevelopmentForm.addControl('month', new FormControl(null))
    singleDevelopmentForm.addControl('year', new FormControl(null))
    singleDevelopmentForm.addControl('carry', new FormControl('no'))
    singleDevelopmentForm.addControl('fetchIndex', new FormControl(formIndex))
    return singleDevelopmentForm
  }

  //runs when save button is clicked
  onSave(form) {
    this.notification.show("Saved", 'ok', 3000)
    this.formStatus[form].status = "true"
    this.examinationForm.get(form).get('status').patchValue("true")
    // this.examinationForm.get(form).disable();
    // this.checkTeethChart();
    let singleFormData = this.examinationForm.getRawValue()[form]
    let developmentData = singleFormData.development
    this.pushedDevelopmentItems = []
    Object.keys(developmentData).forEach((item) => {
      if (developmentData[item]['val'] == 0 && developmentData[item]['carry'] == 'no') {
        developmentData[item]['fetchIndex'] += 1
        developmentData[item]['carry'] = "yes"
        let x = {}
        x[item] = developmentData[item]
        this.pushedDevelopmentItems.push(x)
      }
    })
    this.savedData["teethChart"] = this.teethChartRows
    this.savedData["milestoneContent"] = this.milestoneContent
    if (!("examinationForm" in this.savedData)) {
      this.savedData["examinationForm"] = {}
    }

    this.savedData["examinationForm"][form] = singleFormData
    this.submit(this.savedData)

  }

  // checkTeethChart(){
  //   this.teethChartRows.forEach((data) =>{
  //     if(data.checklist_1.value == true){
  //       data.checklist_1.status = true
  //     }
  //     if(data.checklist_2.value == true){
  //       data.checklist_2.status = true
  //     }
  //   })
  // }

  //save the data to DB
  submit(savedData) {
    let id = localStorage.getItem('patient_id')
    const data = {
      _id: id,
      child_specific_development_examination_form: JSON.stringify(savedData["examinationForm"]),
      child_specific_milestone_content: JSON.stringify(savedData["milestoneContent"]),
      child_specific_teeth_chart: JSON.stringify(savedData["teethChart"])
    };
    this.growthService.updateChildDevelopmentExaminationForm(data).subscribe((data) => {
      console.log("child_examination_patched")
    })
  }


  ngOnDestroy() {
    this.patDataServ.unsubscribe();
  }

}
