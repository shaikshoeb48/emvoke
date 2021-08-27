import { Component, OnInit, Inject , Optional } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import {VaccinationService} from './../../../prescription/Vaccination/vaccination.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-selectvaccinemodal',
  templateUrl: './selectvaccinemodal.component.html',
  styleUrls: ['./selectvaccinemodal.component.scss']
})
export class SelectvaccinemodalComponent implements OnInit {
  modalDataList=[];
  category;
  selectedVaccines=[];
  fillSearchResults=[];
  searchResults=[];
  public vaccines;
  givenVaccine;
  searchInput = new FormControl();
  data;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,public dialogRef: MatDialogRef<SelectvaccinemodalComponent>,private vaccineService:VaccinationService) { }

  ngOnInit() {  
    if(this.dialogData){
      this.data = this.dialogData?this.dialogData:'';
    }
    console.log(this.dialogData);
    this.vaccines = this.dialogData.vaccines;
    this.populateVaccineSearch();
  }

  populateVaccineSearch(){
    this.fillSearchResults = this.vaccineService.newVaccineSource;
    // if(this.category==='adult'){
    //     this.fillSearchResults = this.vaccineService.vaccineSource
    //                                 .filter((vaccine=>vaccine.category.includes(this.category)));
    // }
    // else if(this.category==='child'){
    //      this.fillSearchResults=this.vaccineService.vaccineSource
    //                                 .filter((vaccine=>vaccine.category.includes(this.category)));
    // }
    // else if(this.category==='pregnancy'){
    //     this.fillSearchResults = this.vaccineService.vaccineSource
    //                                   .filter((vaccine=>vaccine.category.includes(this.category)));
    // }
    // else if(this.category==='travel'){
    //     this.fillSearchResults = this.vaccineService.vaccineSource
    //                                .filter((vaccine=>vaccine.category.includes(this.category)));
    // }
    // else if(this.category==='all-vaccines'){
    //   this.fillSearchResults = this.vaccineService.vaccineSource
    //                             .filter((vaccine=>vaccine.category.includes(this.category)));
    // }
  }
vaccineSelected(vaccine){
  console.log(vaccine,'give this vaccine');
  this.givenVaccine = vaccine;
}

giveSelectedVaccine(){
  const Vaccine = this.givenVaccine;
  this.dialogRef.close(Vaccine);
}

searchVaccine(searchTerm){
  var newarr=[];
  let regex = new RegExp(searchTerm,'gi');
  if(searchTerm==''){
    this.modalDataList=[];
  }
  else {
    // this.searchResults = this.fillSearchResults.filter((result)=>{
    //   console.log(result.name.match(regex)3)
    //   if(result.name.match(regex) == null){
    //     result.options.filter(opt_name => {
    //       return opt_name.option_name.match(regex);
    //     })
    //   }else{
    //     return result.name.match(regex);
    //   }
    //  });
    
    this.fillSearchResults.forEach(element => {
      element.options.forEach(opt => {
        newarr.push(opt);
      });
    });

    this.searchResults = newarr.filter(vaccine => {
      return vaccine.option_name.match(regex);
    })


     if(this.searchResults.length==0){
      this.modalDataList=[{option_name:`${searchTerm}`}];
     }
     else{
      this.modalDataList = this.searchResults;
      }
   
   }
  }

closeModal(){
   this.dialogRef.close();
}



}
