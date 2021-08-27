import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PrescriptionService } from 'src/app/prescription/prescription.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-multi-selector-dropdown',
  templateUrl: './multi-selector-dropdown.component.html',
  styleUrls: ['./multi-selector-dropdown.component.scss']
})
export class MultiSelectorDropdownComponent implements OnInit {


  constructor(private prescriptionService: PrescriptionService) { }
  patDataServ: Subscription;

  @Input() list: any[];
  @Input() developmentDate
  @Output() shareCheckedList = new EventEmitter();
  @Input() selectedList;

  multiDropDownForm;
  showDropDown;
  checkedList: any[] = [];
  currentSelected: {};
  searchText: FormControl;
  newList: any[]

  currentMonth = {};
  currentYear = {};
  ngOnInit() {
    this.checkedList = [];
    this.onCreateCurrentDate();
    this.onPatchMilestone();
  }

  onPatchMilestone() {
    if (this.selectedList) {
      this.selectedList.forEach((data) => {
        this.list.forEach((listData) => {
          if (listData.name == data.name) {
            listData.name = data.name
            listData.checked = data.checked
            listData.month = data.month
            listData.year = data.year
            this.currentMonth[data.name] = data.month;
            this.currentYear[data.name] = data.year
            this.checkedList.push(listData);
          }
        })

      })
    }
  }

  onCreateCurrentDate() {
    this.list.forEach((data, index) => {
      this.currentMonth[data.name] = this.developmentDate[0][new Date().getMonth()]
      this.currentYear[data.name] = new Date().getFullYear()
    })
  }


  getSelectedValue(status: Boolean, value) {
    this.currentSelected = { checked: status, name: value, month: this.currentMonth[value], year: this.currentYear[value] };
    if (status) {
      this.checkedList.push(this.currentSelected);
    } else {
      let item = this.checkedList.find((data,index)=>{
        if(data.name == value){
          return true
        }
      })
      let index = this.checkedList.indexOf(item);
      this.checkedList.splice(index, 1);
    }
    this.shareCheckedlist();
  }

  shareCheckedlist() {

    this.shareCheckedList.emit(this.checkedList);
  }

  onChangeMonth(month, item) {
    this.currentMonth[item.name] = month
    this.currentSelected = this.checkedList.filter((data) => {
      return data.name == item.name
    })[0]
    this.currentSelected['month'] = month
    this.shareCheckedlist();

  }

  onChangeYear(year, item) {
    this.currentYear[item.name] = year
    this.currentSelected = this.checkedList.filter((data) => {
      return data.name == item.name
    })[0]
    this.currentSelected['year'] = year
    this.shareCheckedlist();
  }
}
