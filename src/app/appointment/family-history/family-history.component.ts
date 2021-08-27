import { Component, OnInit , Output , EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA , MatDialogRef  } from '@angular/material/dialog' ;
import { PatientService } from '../../patient/patient.service' ;
import { PrescriptionService } from '../../prescription/prescription.service';
import { Debounce } from '../../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss'],
  providers: [PrescriptionService]
})
export class FamilyHistoryComponent implements OnInit {

  familyForm: FormGroup ;
  @Output() tabEvent:EventEmitter<any> = new EventEmitter();
  @Input() data ;
  @Input() isHideSubmit;
  @Output() notifyNext = new EventEmitter();
  family_history = {
    illnesses: [],
    family_history_notes: '',
  };

  modalData = {
    illnesses: []
  };

  iSelectedIndex: any;
  family_members = ['Mother', 'Father', 'Sister', 'Brother', 'Spouse','MaternalGrandFather','MaternalGrandMother','PaternalGrandFather','PaternalGrandMother'];

  showCustomAdd: boolean = false;
  inputForCustomAdd: String = '';
  currentTab: String;
  constructor(private fB: FormBuilder, private patientService: PatientService, private prescriptionService: PrescriptionService, private dialogRef: MatDialogRef<FamilyHistoryComponent> ) {
    this.familyForm = new FormGroup({
      illness: new FormControl('', []),
      familyHistoryNotes: new FormControl('', [])
    });
    this.currentTab = 'family_history';
   }

  ngOnInit() {
    // this.createForm() ;
    if (this.data.family_history) {
      this.family_history = JSON.parse(this.data.family_history);
      this.patchData(this.family_history);
    }
  }

  patchData(family_history) {
    if (family_history.illnesses.length) {
      this.iSelectedIndex = 0;
    }
    if (family_history.family_history_notes) {
      this.familyForm.get('familyHistoryNotes').setValue(family_history.family_history_notes);
    }
  }

  @Debounce(1000)
  illnessSearch(ev) {
    if (ev.target.value.length > 3) {
      this.prescriptionService.readPrescriptionData({term: ev.target.value, semanticTag:'disorder'}).subscribe(result => {
        if (result.items.length) {
          this.showCustomAdd = false;
          this.modalData.illnesses = result.items;
        } else {
          this.modalData.illnesses = [];
          this.inputForCustomAdd = ev.target.value;
          this.showCustomAdd = true;
        }
      });
    }
  }

  customAddIllness() {
    this.familyForm.get('illness').setValue('');
    this.family_history.illnesses.push({term: this.inputForCustomAdd, id: '', conceptFsn: ''});
    this.iSelectedIndex = this.family_history.illnesses.length - 1;
    this.family_history.illnesses[this.iSelectedIndex]['family_members'] = {};
    this.showCustomAdd = false;
  }

  illnessSelected(value) {
    this.familyForm.get('illness').setValue('');
    this.family_history.illnesses.push({term: value.term, id: value.id, conceptFsn: value.conceptFsn});
    this.iSelectedIndex = this.family_history.illnesses.length - 1;
    this.family_history.illnesses[this.iSelectedIndex]['family_members'] = {};
    this.modalData.illnesses = [];
  }

  illnessRemove(index) {
    this.family_history.illnesses.splice(index, 1);
  }

  chooseFamilyMember(index) {
    this.iSelectedIndex = index;
  }
  
  backprop(ev) {
    ev.stopPropagation();
  }

  switchTab(value) {
    if (this.currentTab == value) {
      this.currentTab = '';
      return;
    }
    this.currentTab = value;
  }

  selectFamilyMember(member) {
    if (this.family_history.illnesses[this.iSelectedIndex]['family_members'][member]) {
      this.family_history.illnesses[this.iSelectedIndex]['family_members'][member] = false;
    } else {
      this.family_history.illnesses[this.iSelectedIndex]['family_members'][member] = true;
    }
  }

  familyHistoryNotesInput(ev) {
    this.family_history['family_history_notes'] = ev.target.value;
  }

  submit() {
    const data = {
      _id: this.data._id,
      family_history: JSON.stringify(this.family_history)
    };
    this.patientService.patientCreate(data, 'patch');
    this.dialogRef.close('Family History Submitted');
  }

  next() {
    this.notifyNext.emit({index: 2, key: 'family_history', data: JSON.stringify(this.family_history)});
  }

}
