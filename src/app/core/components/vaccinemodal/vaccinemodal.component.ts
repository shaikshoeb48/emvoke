import { Component, OnInit, Inject , Optional } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import {VaccinationService} from './../../../prescription/Vaccination/vaccination.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vaccinemodal',
  templateUrl: './vaccinemodal.component.html',
  styleUrls: ['./vaccinemodal.component.scss']
})
export class VaccinemodalComponent implements OnInit {
  modalDataList=[];
  category;
  selectedVaccines=[];
  fillSearchResults=[];
  searchResults=[];
  searchInput = new FormControl();
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,public dialogRef: MatDialogRef<VaccinemodalComponent>,private vaccineService:VaccinationService) { }
  
  ngOnInit() {  
    if(this.dialogData){
      this.category = this.dialogData.category?this.dialogData.category:'all-vaccines';
    }
    this.populateVaccineSearch();
  }

  populateVaccineSearch(){
    console.log('category',this.category);
    this.fillSearchResults = this.vaccineService.newVaccineSource;
    console.log(this.fillSearchResults);
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
dataSelected(event){
  this.selectedVaccines.push(event.target.value);
}

addSelectedVaccine(){
  console.log("Add function called");
  const Vaccines = this.selectedVaccines;
  this.dialogRef.close(Vaccines);
}

searchVaccine(searchTerm){
  var newarr=[];
  console.log(searchTerm);
  console.log(this.fillSearchResults);
  let regex = new RegExp(searchTerm,'gi');
  console.log(regex);
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

    console.log(this.searchResults,newarr);

     if(this.searchResults.length==0){
      console.log("I'm in")
      this.modalDataList=[{option_name:`${searchTerm}`}];
     }
     else{
      this.modalDataList = this.searchResults;
      console.log("modalList",this.modalDataList);
      }
   
   }
  }

closeModal(){
   this.dialogRef.close();
}

}

