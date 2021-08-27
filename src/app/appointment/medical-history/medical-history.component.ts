import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PatientService } from '../../patient/patient.service';
import { PrescriptionService } from '../../prescription/prescription.service';
import { AppointmentService } from '../appointment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA , MatDialogRef  } from '@angular/material/dialog' ;
import { Debounce } from '../../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
  providers: [PrescriptionService]
})
export class MedicalHistoryComponent implements OnInit {

  @Input() data;
  @Output() tabEvent: EventEmitter<any> = new EventEmitter();
  @Input() isHideSubmit;
  @Output() notifyNext = new EventEmitter();
  @ViewChild("medicalProblems") medicalProblemInput: ElementRef;

  lifestyleList = [ 'Late night', 'Fried food' , 'High carb food' , 'Dietary modifications', 'smoking',
      'Drugs' , 'No exercise' , 'Alcohol',  'HIV Risk' , 'Sedentary Lifestyle' , 'Rest Pattern disrupt family lifestyle',
      'sleep pattern disrupt family lifestyle', 'cardiovascular health integrated', 'Lifestyle Diet','Sleeps more than 12 hours'] ;

  isLifestyleOther = false ;
  medical_history = {
    medical_problems: [],
    medications: [],
    medical_problems_notes: '',
    allergies: {
      has_allergies: false,
      general_allergies: [],
      drug_allergies: [],
      drug_allergies_notes: ''
    },
    lifestyle: [],
    lifestyle_notes: '',
    procedure: {
      procedures: [],
      procedure_notes: '',
      procedure_undergone: 'no'
    },
    risk_factor: {
      risk_factors: [],
      risk_factor_notes: ''
    },
    other: {
      other_hospitalization_record: '',
      other_hospitalization_record_notes: '',
      other_medical_history: '',
      other_medical_history_notes: ''
    }
  };

  modalData = {
    medicalProblems: [],
    medications: [],
    allergies: {
      drug_allergies: []
    },
    procedures: []
  };

  medicalHistoryForm: FormGroup;

  // For tabs
  currentTab: String;

  // Medical Problems
  mPSelectedIndex: any;
  durations = ['0-3 Months', '3-6 Months', '6-9 Months', '9-12 Months', '1-2 years', '2-4 years', '4-6 years']
  showCustomAddMedicalProblem: boolean = false;
  inputForMedicalProblem: String = '';
  // Medications
  mSelectedIndex: any;
  medicationsDuration = [{ key: 'once', value: 'Once' },{ key: 'daily', value: 'Daily' }, { key: 'weekly', value: 'Weekly' }, { key: 'monthly', value: 'Monthly' }, { key: 'yearly', value: 'Yearly' }];
  showCustomAddMedication: boolean = false;
  inputForMedication: String = '';
  // Allergies
  dASelectedIndex: any;
  showCustomAddDrugAllergies: boolean = false;
  inputForCustomAddDrugAllergies: string = '';
  // Lifestyle
  lSelectedIndex: any;
  // Procedure
  pSelectedIndex: any;
  procedureDurations = ['0-3 Months', '3-6 Months', '6-9 Months', '9-12 Months', '1-2 years', '2-4 years', '4+ years'];
  showCustomAddProcedure: boolean = false;
  inputForCustomAddProcedure: String = '';

  constructor(private patientService: PatientService, private prescriptionService: PrescriptionService, private appointmentService: AppointmentService, private dialogRef: MatDialogRef<MedicalHistoryComponent>) {
    console.log("Constructor") ;
  }

  ngOnInit() {
    console.log('init');
    this.medicalHistoryForm = new FormGroup({
      medicalProblem: new FormControl('', []),
      medications: new FormControl('', []),
      medicationsDurationMonth: new FormControl('', []),
      medicationsDurationYear: new FormControl('', []),
      medicationsDurationDose: new FormControl('', []),
      medicationsDurationInterval: new FormControl('daily', []),
      medicalHistoryNotes: new FormControl('', []),
      generalAllergies: new FormControl('', []),
      drugAllergies: new FormControl('', []),
      drugAllergiesNotes: new FormControl('', []),
      lifeStyle: new FormControl('', []),
      lifeStyleNotes: new FormControl('', []),
      procedure: new FormControl('', []),
      procedureNotes: new FormControl('', []),
      riskFactor: new FormControl('', []),
      riskFactorNotes: new FormControl('', []),
      otherHospitalizationRecord: new FormControl('', []),
      otherHospitalizationRecordNotes: new FormControl('', []),
      otherMedicalHistory: new FormControl('', []),
      otherMedicalHistoryNotes: new FormControl('', []),
    });
    this.currentTab = 'medical_problems';
    this.patchData();
  }

  backprop(ev) {
    ev.stopPropagation();
  }

  // Tab Switches
  switchTab(value) {
    if (this.currentTab == value) {
      this.currentTab = '';
      return;
    }
    this.currentTab = value;
  }

  // patch data
  patchData() {
    const medical_history = this.data.medical_history;
    console.log('here');
    if (medical_history && medical_history.chronic_disease_history && medical_history.current_medication && medical_history.current_allergies && medical_history.prev_surgeries && medical_history.notes) {
      medical_history.chronic_disease_history = typeof medical_history.chronic_disease_history == 'string' ? JSON.parse(medical_history.chronic_disease_history) : medical_history.chronic_disease_history;
      medical_history.current_medication = typeof medical_history.current_medication == 'string' ? JSON.parse(medical_history.current_medication) : medical_history.current_medication;
      medical_history.current_allergies = typeof medical_history.current_allergies == 'string' ? JSON.parse(medical_history.current_allergies) : medical_history.current_allergies;
      medical_history.prev_surgeries = typeof medical_history.prev_surgeries == 'string' ? JSON.parse(medical_history.prev_surgeries) : medical_history.prev_surgeries;
      medical_history.notes = typeof medical_history.notes == 'string' ? JSON.parse(medical_history.notes) : medical_history.notes;

      // patch medical problems
      this.medical_history.medical_problems = medical_history.chronic_disease_history.medical_problems;
      this.medical_history.medical_problems_notes = medical_history.chronic_disease_history.notes;
      this.medicalHistoryForm.get('medicalHistoryNotes').setValue(this.medical_history.medical_problems_notes);
      //medications
      this.medical_history.medications = medical_history.current_medication;

      // allergies
      this.medical_history.allergies = medical_history.current_allergies;
      this.medicalHistoryForm.get('drugAllergiesNotes').setValue(this.medical_history.allergies.drug_allergies_notes);

      // lifestyle
      this.medical_history.lifestyle = medical_history.notes.lifestyle.lifestyles;
      this.medical_history.lifestyle_notes = medical_history.notes.lifestyle.notes;
      this.medicalHistoryForm.get('lifeStyleNotes').setValue(this.medical_history.lifestyle_notes);

      // procedures
      this.medical_history.procedure = medical_history.prev_surgeries;
      this.medicalHistoryForm.get('procedureNotes').setValue(this.medical_history.procedure.procedure_notes);

      // risk factor
      this.medical_history.risk_factor = medical_history.notes.risk_factor;
      this.medicalHistoryForm.get('riskFactorNotes').setValue(this.medical_history.risk_factor.risk_factor_notes);

      // other
      this.medical_history.other = medical_history.notes.others;
      this.medicalHistoryForm.get('otherHospitalizationRecord').setValue(this.medical_history.other.other_hospitalization_record);
      this.medicalHistoryForm.get('otherHospitalizationRecordNotes').setValue(this.medical_history.other.other_hospitalization_record_notes);
      this.medicalHistoryForm.get('otherMedicalHistory').setValue(this.medical_history.other.other_medical_history);
      this.medicalHistoryForm.get('otherMedicalHistoryNotes').setValue(this.medical_history.other.other_medical_history_notes);
    }
    console.log('here');
  }

  next(nextVal) {
    this.currentTab = nextVal;
  }

  // Medical Problems

  
  @Debounce(1000)
  medicalProblemSearch(value) {
    if (value.length > 3) {
      this.prescriptionService.readPrescriptionData({ term: value, semanticTag: 'disorder' }).subscribe(result => {
        console.log(result.items)
        if (result.items.length) {
          this.showCustomAddMedicalProblem = false;
          this.modalData.medicalProblems = result.items;
        } else {
          this.modalData.medicalProblems = [];
          this.inputForMedicalProblem = value;
          this.showCustomAddMedicalProblem = true;
        }
      });
    }
  }

  customAddMedicalProblem() {
    this.medicalHistoryForm.get('medicalProblem').setValue('');
    this.medical_history.medical_problems.push({ term: this.inputForMedicalProblem, id: '', conceptFsn: '' });
    this.mPSelectedIndex = this.medical_history.medical_problems.length - 1;
    this.modalData.medicalProblems = [];
    this.showCustomAddMedicalProblem = false;

  }

  medicalProblemSelected(value) {
    this.medicalHistoryForm.get('medicalProblem').setValue('');
    this.medical_history.medical_problems.push({ term: value.term, id: value.id, conceptFsn: value.conceptFsn });
    this.mPSelectedIndex = this.medical_history.medical_problems.length - 1;
    this.modalData.medicalProblems = [];

  }

  medicalProblemRemove(index) {
    this.medical_history.medical_problems.splice(index, 1);
  }

  chooseDuration(index) {
    this.mPSelectedIndex = index;
  }

  selectDuration(duration) {
    this.medical_history.medical_problems[this.mPSelectedIndex]['duration'] = duration;
  }

  // Medications
  @Debounce(1000)
  medicationsSearch(ev) {
    if (ev.target.value.length > 3) {
      this.appointmentService.getMedications({ search_term: ev.target.value }).subscribe(result => {
        console.log(result);
        if (result && result.Data) {
          this.showCustomAddMedication = false;
          result.Data = JSON.parse(atob(result.Data));
          if (result.Data.length) {
            this.showCustomAddMedication = false;
            this.modalData.medications = result.Data;
          } else {
            this.modalData.medications = [];
            this.inputForMedication = ev.target.value;
            this.showCustomAddMedication = true;
          }
        } else {
          this.modalData.medications = [];
          this.inputForMedication = ev.target.value;
          this.showCustomAddMedication = true;
        }
      });
    }
  }

  customAddMedication() {
    this.medicalHistoryForm.get('medications').setValue('');
    this.medical_history.medications.push({ _id: '', name: this.inputForMedication });
    this.mSelectedIndex = this.medical_history.medications.length - 1;
    this.medical_history.medications[this.mSelectedIndex]['duration'] = { interval: 'daily' };
    this.modalData.medications = [];
    this.showCustomAddMedication = false;
  }

  medicationSelected(value) {
    this.medicalHistoryForm.get('medications').setValue('');
    this.medical_history.medications.push({ _id: value._id, name: value.name });
    this.mSelectedIndex = this.medical_history.medications.length - 1;
    this.medical_history.medications[this.mSelectedIndex]['duration'] = { interval: 'daily' };
    this.modalData.medications = [];
  }

  medicationsRemove(index) {
    this.medical_history.medications.splice(index, 1);
  }

  chooseDurationMedication(index) {
    this.mSelectedIndex = index;
    //patch
    if (this.medical_history.medications[this.mSelectedIndex]['duration']) {
      const month = this.medical_history.medications[this.mSelectedIndex]['duration']['month'] ? this.medical_history.medications[this.mSelectedIndex]['duration']['month'] : '';
      this.medicalHistoryForm.get('medicationsDurationMonth').setValue(month);

      const year = this.medical_history.medications[this.mSelectedIndex]['duration']['year'] ? this.medical_history.medications[this.mSelectedIndex]['duration']['year'] : '';
      this.medicalHistoryForm.get('medicationsDurationYear').setValue(year);

      const dose = this.medical_history.medications[this.mSelectedIndex]['duration']['dose'] ? this.medical_history.medications[this.mSelectedIndex]['duration']['dose'] : '';
      this.medicalHistoryForm.get('medicationsDurationDose').setValue(dose);

      const interval = this.medical_history.medications[this.mSelectedIndex]['duration']['interval'] ? this.medical_history.medications[this.mSelectedIndex]['duration']['interval'] : '';
      this.medicalHistoryForm.get('medicationsDurationInterval').setValue(interval);
    } else {
      this.medicalHistoryForm.get('medicationsDurationMonth').setValue('');
      this.medicalHistoryForm.get('medicationsDurationYear').setValue('');
      this.medicalHistoryForm.get('medicationsDurationDose').setValue('');
      this.medicalHistoryForm.get('medicationsDurationInterval').setValue('daily');
    }
  }

  medicationDurationInput(ev, key) {
    if (this.medical_history.medications[this.mSelectedIndex]['duration']) {
      this.medical_history.medications[this.mSelectedIndex]['duration'][key] = ev.target.value;
    } else {
      this.medical_history.medications[this.mSelectedIndex]['duration'] = {};
      this.medical_history.medications[this.mSelectedIndex]['duration'][key] = ev.target.value;
    }
  }

  medicationsDurationIntervalChange(ev) {
    if (this.medical_history.medications[this.mSelectedIndex]['duration']) {
      this.medical_history.medications[this.mSelectedIndex]['duration']['interval'] = ev.target.value;
    } else {
      this.medical_history.medications[this.mSelectedIndex]['duration'] = {};
      this.medical_history.medications[this.mSelectedIndex]['duration']['interval'] = ev.target.value;
    }
  }

  medicalHistoryNotesInput(ev) {
    this.medical_history['medical_problems_notes'] = ev.target.value;
  }

  //Allergies

  changeHasAllergies(flag) {
    this.medical_history.allergies.has_allergies = flag;
  }

  generalAllergiesAdd(ev) {
    if (ev.target.value) {
      if (!this.medical_history.allergies.general_allergies.includes(ev.target.value)) {
        this.medical_history.allergies.general_allergies.push(ev.target.value);
        this.medicalHistoryForm.get('generalAllergies').setValue('');
      }
    }
  }

  allergyGeneralRemove(index) {
    this.medical_history.allergies.general_allergies.splice(index, 1);
  }

  drugAllergiesSearch(ev) {
    if (ev.target.value.length > 3) {
      this.appointmentService.getMedications({ search_term: ev.target.value }).subscribe(result => {
        if (result && result.Data) {
          this.showCustomAddDrugAllergies = false;
          result.Data = JSON.parse(atob(result.Data));
          if (result.Data.length) {
            this.showCustomAddDrugAllergies = false;
            this.modalData.allergies.drug_allergies = result.Data;
          } else {
            this.showCustomAddDrugAllergies = true;
            this.modalData.allergies.drug_allergies = [];
            this.inputForCustomAddDrugAllergies = ev.target.value;
          }
        } else {
          this.showCustomAddDrugAllergies = true;
          this.modalData.allergies.drug_allergies = [];
          this.inputForCustomAddDrugAllergies = ev.target.value;
        }
      });
    }
  }

  customAddDrugAllergies() {
    this.medicalHistoryForm.get('drugAllergies').setValue('');
    this.medical_history.allergies.drug_allergies.push({ _id: '', name: this.inputForCustomAddDrugAllergies });
    this.dASelectedIndex = this.medical_history.allergies.drug_allergies.length - 1;
    this.modalData.allergies.drug_allergies = [];
    this.showCustomAddDrugAllergies = false;
  }

  drugAllergiesSelected(value) {
    this.medicalHistoryForm.get('drugAllergies').setValue('');
    this.medical_history.allergies.drug_allergies.push({ _id: value._id, name: value.name });
    this.dASelectedIndex = this.medical_history.allergies.drug_allergies.length - 1;
    this.modalData.allergies.drug_allergies = [];
  }

  allergyDrugRemove(index) {
    this.medical_history.allergies.drug_allergies.splice(index, 1);
  }

  drugAllergiesNotesInput(ev) {
    this.medical_history.allergies.drug_allergies_notes = ev.target.value;
  }

  // Lifestyle
  lifeStyleAdd(ev) {
    if(ev.target.value == "other" && !this.isLifestyleOther){
      this.isLifestyleOther = true ;
      return ;
    }

    if (ev.target.value) {
      if (!this.medical_history.lifestyle.includes(ev.target.value)) {
        this.isLifestyleOther = false ;
        this.medical_history.lifestyle.push(ev.target.value);
        this.lSelectedIndex = this.medical_history.lifestyle.length - 1;
        this.medicalHistoryForm.get('lifeStyle').setValue('');
      }
    }
  }

  lifestyleRemove(index) {
    this.medical_history.lifestyle.splice(index, 1);
  }

  lifestyleNotesInput(ev) {
    this.medical_history.lifestyle_notes = ev.target.value;
  }

  // Procedure
  changeHasProcedureUndergone(flag) {
    this.medical_history.procedure.procedure_undergone = flag;
  }

  @Debounce(1000)
  procedureSearch(ev) {
    if (ev.target.value.length > 3) {
      this.prescriptionService.readPrescriptionData({ term: ev.target.value, semanticTag: 'procedure' }).subscribe(result => {
        if (result.items.length) {
          this.showCustomAddProcedure = false;
          this.modalData.procedures = result.items;
        } else {
          this.showCustomAddProcedure = true;
          this.modalData.procedures = [];
          this.inputForCustomAddProcedure = ev.target.value;
        }
      });
    }
  }

  customAddProcedure() {
    this.medicalHistoryForm.get('procedure').setValue('');
    this.medical_history.procedure.procedures.push({ term: this.inputForCustomAddProcedure, id: '', conceptFsn: '' });
    this.pSelectedIndex = this.medical_history.procedure.procedures.length - 1;
    this.modalData.procedures = [];
    this.showCustomAddProcedure = false;
  }

  procedureSelected(value) {
    this.medicalHistoryForm.get('procedure').setValue('');
    this.medical_history.procedure.procedures.push({ term: value.term, id: value.id, conceptFsn: value.conceptFsn });
    this.pSelectedIndex = this.medical_history.procedure.procedures.length - 1;
    this.modalData.procedures = [];
  }

  chooseProcedureDuration(index) {
    this.pSelectedIndex = index;
  }

  procedureRemove(index) {
    this.medical_history.procedure.procedures.splice(index, 1);
  }

  selectDurationProcedure(duration) {
    this.medical_history.procedure.procedures[this.pSelectedIndex]['duration'] = duration;
  }

  procedureNotesInput(ev) {
    this.medical_history.procedure.procedure_notes = ev.target.value;
  }

  // Risk Factors
  riskFactorAdd(ev) {
    if (ev.target.value) {
      if (!this.medical_history.risk_factor.risk_factors.includes(ev.target.value)) {
        this.medical_history.risk_factor.risk_factors.push(ev.target.value);
        this.medicalHistoryForm.get('riskFactor').setValue('');
      }
    }
  }

  riskFactorRemove(index) {
    this.medical_history.risk_factor.risk_factors.splice(index, 1);
  }

  riskFactorNotesInput(ev) {
    this.medical_history.risk_factor.risk_factor_notes = ev.target.value;
  }

  // Others
  otherHospitalizationRecordInput(ev) {
    this.medical_history.other.other_hospitalization_record = ev.target.value;
  }

  otherHospitalizationRecordNotesInput(ev) {
    this.medical_history.other.other_hospitalization_record_notes = ev.target.value;
  }

  otherMedicalHistoryInput(ev) {
    this.medical_history.other.other_medical_history = ev.target.value;
  }

  otherMedicalHistoryNotesInput(ev) {
    this.medical_history.other.other_medical_history_notes = ev.target.value;
  }


  // submit

  constructData() {
    const data = {
      _id: this.data._id,
      medical_history: {
        chronic_disease_history: JSON.stringify({ medical_problems: this.medical_history.medical_problems, notes: this.medical_history.medical_problems_notes }),
        current_medication: JSON.stringify(this.medical_history.medications),
        current_allergies: JSON.stringify(this.medical_history.allergies),
        prev_surgeries: JSON.stringify(this.medical_history.procedure),
        notes: JSON.stringify({
          lifestyle: {
            lifestyles: this.medical_history.lifestyle,
            notes: this.medical_history.lifestyle_notes
          },
          risk_factor: this.medical_history.risk_factor,
          others: this.medical_history.other
        })
      }
    };
    return data;
  }

  submit() {
    this.patientService.patientCreate(this.constructData(), 'patch');
    this.dialogRef.close('Medical History Submitted');
  }

  nextv2() {
    const data = {
      medical_history: {
        chronic_disease_history: JSON.stringify({ medical_problems: this.medical_history.medical_problems, notes: this.medical_history.medical_problems_notes }),
        current_medication: JSON.stringify(this.medical_history.medications),
        current_allergies: JSON.stringify(this.medical_history.allergies),
        prev_surgeries: JSON.stringify(this.medical_history.procedure),
        notes: JSON.stringify({
          lifestyle: {
            lifestyles: this.medical_history.lifestyle,
            notes: this.medical_history.lifestyle_notes
          },
          risk_factor: this.medical_history.risk_factor,
          others: this.medical_history.other
        })
      }
    };
    this.notifyNext.emit({ index: 3, key: 'medical_history', data: data });
  }
}
