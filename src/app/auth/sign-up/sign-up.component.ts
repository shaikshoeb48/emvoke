import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MustMatch } from '../../core/helpers/validators';
import { AuthService } from '../../core/services/auth.service';
import { SignupUtilitiesService } from './../../auth/sign-up/signup-utilities.service';
import { async } from '@angular/core/testing';
import { NotificationService } from '../../core/services/notification.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StatesDistService } from 'src/app/core/services/states-dist.service';
import { CountryCodeService } from 'src/app/core/services/country-code.service';
//import { countryCodes } from './country-codes';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit, AfterViewInit {
  myControl3 = new FormControl();
  options3: string[] = [];
  filteredOptions3: Observable<string[]>;
  myControl1 = new FormControl();
  myControl2 = new FormControl();
  options1: string[] = ["Pediatrician",
    "Internal Medicine Physician",
    "General Physician",
    "Cardiologist",
    "Urologist",
    "Diabetologist",
    "Pulmonologist",
    "Gastroenterologist",
    "Dermatologist",
    "Endocrinologist",
    "Gynaecologist",
    "E.N.T.",
    "Orthopedician",
    "Psychiatrist",
    "Neurologist",
    "Nephrologist",
    "Dentist"];
  options2: string[] = ["Adoni",
    "Agartala",
    "Agra",
    "Ahmedabad",
    "Ahmednagar",
    "Airoli",
    "Aizawl",
    "Ajmer",
    "Akola",
    "Alandur chennai",
    "Alappuzha",
    "Aligarh",
    "Allahabad",
    "Alwar",
    "Amaravati",
    "Ambajipeta,EGD",
    "Ambala",
    "Ambattur",
    "Ambernath",
    "Amravati",
    "Amritsar",
    "Amroha",
    "Anand",
    "Anantapur",
    "Arrah",
    "Asansol",
    "Aurangabad",
    "Avadi",
    "Bagaha",
    "BAGALKOT",
    "Baharampur",
    "Bahraich",
    "Bally",
    "Bangalore",
    "Bangalore Rural Dist",
    "Baranagar",
    "Barasat",
    "Bardhaman",
    "Bareily",
    "Bathinda",
    "Bavla Ahmedabad",
    "Begusarai",
    "Belgaum",
    "Bellary",
    "Bengaluru",
    "Berhampur",
    "Bettiah",
    "Bhagalpur",
    "Bhalswa Jahangir Pur",
    "Bharatpur",
    "Bhatpara",
    "Bhavnagar",
    "Bhilai",
    "Bhilwara",
    "Bhimavaram",
    "Bhind",
    "Bhiwandi",
    "Bhiwani",
    "Bhopal",
    "Bhubaneswar",
    "Bhusawal",
    "Bidar",
    "Bidhan Nagar",
    "Bihar Sharif",
    "Bijapur",
    "Bikaner",
    "Bilaspur",
    "Bokaro",
    "Botad",
    "Bulandshahr",
    "Burdwan",
    "Burhanpur",
    "Buxar",
    "Chandigarh",
    "Chandrapur",
    "Chapra",
    "Chennai",
    "Chikhali, Pune",
    "Chikhali, Pune.",
    "Chinsurah",
    "Chiplun",
    "Chittoor",
    "Coimbatore",
    "Cuttack",
    "Danapur",
    "Darbhanga",
    "Davanagere",
    "Dehradun",
    "Dehri",
    "Dehugaon,Tal- Haveli,Dist-Pune....",
    "Delhi",
    "Denkanikottai",
    "Deoghar",
    "Dewas",
    "Dhanbad",
    "Dharmavaram",
    "Dhule",
    "Dindigul",
    "Durg",
    "Durgapur",
    "East Tambaram , chennai",
    "Edinburgh",
    "Eluru",
    "English Bazar",
    "Erode",
    "Etawah",
    "Faridabad",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gandhidham",
    "Gandhinagar",
    "Gaya",
    "Ghaziabad",
    "Gopalpur",
    "Gorakhpur",
    "Gr Noida",
    "Greater noida",
    "Gudivada",
    "Gujarat",
    "Gulbarga",
    "Guna",
    "Guntakal",
    "Guntur",
    "Gurgaon",
    "Gurugram",
    "Guwahati",
    "Gwalior",
    "Hajipur",
    "Haldia",
    "Hapur",
    "Haridwar",
    "Hindupur",
    "Hisar",
    "Hoskote",
    "Hospet",
    "Howrah",
    "Hubballi-Dharwad",
    "Hugli and Chinsurah",
    "Hyderabad",
    "Ichalkaranji",
    "Imphal",
    "Indore",
    "Jabalpur",
    "Jaipur",
    "Jalandhar",
    "Jalgaon",
    "Jalna",
    "Jamalpur",
    "Jammu",
    "Jamnagar",
    "Jamshedpur",
    "Jaunpur",
    "Jehanabad",
    "Jhansi",
    "Jodhpur",
    "Junagadh",
    "Kadapa",
    "Kakinada",
    "Kalyan-Dombivali",
    "Kamarhati",
    "Kanpur",
    "Karaikudi",
    "Karawal Nagar",
    "Karimnagar",
    "Karnal",
    "Katihar",
    "Kavali",
    "Khammam",
    "Khandwa",
    "Kharagpur",
    "Kharghar",
    "Khora",
    "Kilpauk, Chennai",
    "Kilpauk, Chennai-10",
    "Kingdom of Bahrain",
    "Kirari Suleman Nagar",
    "Kishanganj",
    "Kochi",
    "Kodambakkam",
    "Kolar",
    "Kolathur, Chennai",
    "Kolhapur",
    "Kolkata",
    "Kollam",
    "Korattur",
    "Korba",
    "Kota",
    "Kottayam",
    "Kozhikode",
    "Kulti",
    "Kurnool",
    "Latur",
    "Loni",
    "Lucknow",
    "Ludhiana",
    "M",
    "Machilipatnam",
    "Madanapalle",
    "Madhavaram",
    "Madhyamgram",
    "Madurai",
    "Mahad",
    "Mahesana",
    "Maheshtala",
    "Malegaon",
    "Malur",
    "Mangalore",
    "Mango",
    "Mathura",
    "Mau",
    "Meerut",
    "Mira-Bhayandar",
    "Miryalaguda",
    "Mirzapur",
    "Mohali",
    "Moradabad",
    "Morena",
    "Morvi",
    "Motihari",
    "Mumbai",
    "MUMBAI",
    "Munger",
    "Murwara",
    "Muzaffarnagar",
    "Muzaffarpur",
    "Mysore",
    "Nadiad",
    "Nagarcoil",
    "Nagercoil",
    "Nagpur",
    "Naihati",
    "Nanded",
    "Nandyal",
    "Nangloi Jat",
    "Narasaraopet",
    "Nashik",
    "Navi Mumbai",
    "Navi MumbaiPanvel Raigad",
    "NaviMumbai",
    "Nellore",
    "New Delhi",
    "NewDelhi",
    "Nizamabad",
    "Noida",
    "North Dumdum",
    "Ongole",
    "Orai",
    "Ozhukarai",
    "Pali",
    "Pallavaram",
    "Panchkula",
    "Panihati",
    "Panipat",
    "Panvel",
    "Parbhani",
    "Patiala",
    "Patna",
    "Perambur, Chennai",
    "Pimpri-Chinchwad",
    "Pinjore",
    "Porur,CHENNAI 116.",
    "Proddatur",
    "Puducherry",
    "PUNE",
    "Pune",
    "PUNE. Jalna",
    "Purasaivakkam",
    "Purnia",
    "Rae Bareli",
    "Raichur",
    "Raiganj",
    "Raipur",
    "Rajahmundry",
    "Rajgurunagar",
    "Rajkot",
    "Rajpur Sonarpur",
    "Ramagundam",
    "Rampur",
    "Ranchi",
    "Ratlam",
    "Raurkela Industrial Township",
    "Rewa",
    "Rohtak",
    "Rourkela",
    "Sagar",
    "Saharanpur",
    "Saharsa",
    "Sainikpuri,hyderabad",
    "Salem",
    "Sambalpur",
    "Sambhal",
    "Sangli-Miraj & Kupwad",
    "Sanpada,NaviMumbai",
    "Sasaram",
    "Satara",
    "Satna",
    "Secunderabad",
    "Serampore",
    "Seven wells Chennai",
    "Shahapur",
    "Shahdol",
    "Shahjahanpur",
    "Shimla",
    "Shivamogga",
    "Shivpuri",
    "Sikar",
    "Siliguri",
    "Singrauli",
    "Sirsa",
    "Sitapur",
    "Sivagangai",
    "Siwan",
    "Solapur",
    "Sonipat",
    "South Dumdum",
    "Southampton, UK",
    "Sri Ganganagar",
    "Srikakulam",
    "SRIKAKULAM",
    "Srinagar",
    "Sultan Pur Majra",
    "Surat",
    "Surendranagar Dudhrej",
    "Suryapet",
    "Tadepalligudem",
    "Tadipatri",
    "Tenali",
    "Thane",
    "Thanjavur",
    "Thiruvananthapuram",
    "Thoothukudi",
    "Thrissur",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupati",
    "Tiruppur",
    "Tiruvottiyur",
    "Tumkur",
    "Udaipur",
    "Ujjain",
    "Ulhasnagar",
    "Uluberia",
    "Unnao",
    "Vadodara",
    "Varanasi",
    "Vasai-Virar",
    "Vellore",
    "Vijayanagaram",
    "Vijayawada",
    "Visakhapatnam",
    "Waghodia",
    "Warangal",
    "Yamunanagar",
    "Zirakpur"];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions4: Observable<string[]>;
  formOneGrp: FormGroup;
  formTwoGrp: FormGroup;
  formThreeGrp: FormGroup;
  socialHandleList: FormArray;
  isFormOneSubmitted = false;
  isFormTwoSubmitted = false;
  isFormThreeSubmitted = false;
  formOneClass: string;
  formTwoClass: string;
  formThreeClass: string;
  specialities = [
    {
      value: 'surgeon',
      name: 'Surgeon'
    },
    {
      value: 'heartspecialist',
      name: 'Heart Specialist'
    }
  ];
  countryCodeList = [];
  stepIndex: number;
  @ViewChild('stepper') stepper: MatStepper;
  contact_details = [{
    phone_number: '',
    phone_type: 'mobile',
    country_code: '+91'
  }];
  social_handle = [
    {
      name: '',
      url_handle: ''
    }
  ]
  onSignUpexceptionStepper: Subscription = Subscription.EMPTY;
  visibleCountryCodes = false ;
  dropdownIndex = -1 ;

  constructor(private fB: FormBuilder, private notification: NotificationService, private authService: AuthService, private router: Router, private signupservice: SignupUtilitiesService, private statesDist: StatesDistService, private countryCodeService: CountryCodeService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const state = navigation.extras.state as {
        stepId: number;
      };
      this.stepIndex = state.stepId;
    } else {
      this.stepIndex = 0;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.stepper.selectedIndex = this.stepIndex;
    }, 0);
  }
  ngOnInit() {
    this.createForm();
    this.onSignUpexceptionStepper = this.authService.navigationSignUpstepper.subscribe((data: number) => {
      this.stepper.selectedIndex = data
    })
    this.filteredOptions1 = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value))
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value))
    );
    this.filteredOptions3 = this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value => this._filter3(value))
    );
    this.options3 = this.statesDist.states.map(a => a.state);
   // this.options4 = this.countryCodeService.countryCode.map(b =>b.dial_code)
  }
  createForm() {
    this.formOneGrp = this.fB.group({
      name: ['', Validators.required],
      // phone_number: ['', Validators.required],
      // countryCode: ['91', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPwd')
    });

    this.formTwoGrp = this.fB.group({
      speciality: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      //social_handle: this.fB.array([this.createSocialHandleDet()])
    });

    this.formThreeGrp = this.fB.group({
      clinic_terms_condition: ['', Validators.required]
    });

    // this.formOneGrp.get('countryCode').setValue(91);
    // this.socialHandleList = this.formTwoGrp.get('social_handle') as FormArray;
  }



  /* Add multiple medical practice details */
  createSocialHandleDet(): FormGroup {
    return this.fB.group({
      name: [''],
      url_handle: ['']
    });
  }


  addSocialHandleDet() {
    if (this.social_handle.length < 10) {
      if (this.isSocialValid()) {
        this.social_handle.push({
          name: '',
          url_handle: ''
        });
      }
      else {
        this.notification.show("Please fill the existing social handle first", "OK", 5000);
      }
    } else {
      this.notification.show("You cannot add more than 10 social handle", "OK", 5000);
    }

  }

  removeSocialHandleDet(index) {
    if (this.social_handle.length > 1) {
      this.social_handle.splice(index, 1);
    }
    else {
      this.notification.show("Atleast one social handle is required", "OK", 5000);
    }
  }


  isFirstFormValid(field): boolean {
    return ((!this.formOneGrp.get(field).valid && this.formOneGrp.get(field).touched)
      || (this.formOneGrp.get(field).untouched && this.isFormOneSubmitted));
  }

  isSecondFormValid(field): boolean {
    return ((!this.formTwoGrp.get(field).valid && this.formTwoGrp.get(field).touched)
      || (this.formTwoGrp.get(field).untouched && this.isFormTwoSubmitted));
  }

  isThirdFormValid(field): boolean {
    //console.log(this.formThreeGrp.get(field).valid);
    return ((!this.formThreeGrp.get(field).valid && this.formThreeGrp.get(field).touched)
      || (this.formThreeGrp.get(field).untouched && this.isFormThreeSubmitted));
  }


  updateContact(value, index, key) {
    this.contact_details[index][key] = value;
  }

  updateSocial(value, index, key) {
    this.social_handle[index][key] = value;
  }

  isContactValid() {
    let index = this.contact_details.length - 1;

    let phone_number = this.contact_details[index].phone_number;
    let phone_type = this.contact_details[index].phone_type;
    let country_code = this.contact_details[index].country_code;

    return (phone_type && phone_number && country_code);
  }

  isSocialValid() {
    let index = this.social_handle.length - 1;

    let name = this.social_handle[index].name;
    let url_handle = this.social_handle[index].url_handle;

    return (name && url_handle);
  }


  removeContact(index) {
    if (this.contact_details.length > 1) {
      this.contact_details.splice(index, 1);
    }
    else {
      this.notification.show("Atleast one contact is required", "OK", 5000);
    }
  }

  addContact() {
    if (this.isContactValid()) {
      this.contact_details.push({
        phone_type: 'mobile',
        country_code: '+91',
        phone_number: ''
      });
    }
    else {
      this.notification.show("Please fill the existing added contact first", "OK", 5000);
    }
  }
  onCountryCode(index){
    this.visibleCountryCodes = !this.visibleCountryCodes ;
    this.dropdownIndex = this.visibleCountryCodes ? index : -1;
  }


  searchCountryCode(event?){
    const searchData = event ? event.target.value : '+91' ;
    this.countryCodeService.searchCountryCode(searchData).subscribe(list => {
      this.countryCodeList = list ;
    }, err => console.error(err)) ;
  }

  changeCountryCode(value, index, inputEl){
    this.contact_details[index]['country_code'] = value ;
     const contact = this.contact_details[index] ;
     inputEl.value = value ;
     console.log(this.contact_details[index]) ;
     this.visibleCountryCodes = false ;
     this.dropdownIndex = -1 ;
  }

  onSubmitFormOne() {
    this.isFormOneSubmitted = true;
    this.formOneClass = 'invalid-form';
    let lowerCaseEmail = this.formOneGrp.get('email').value.toLowerCase();
    this.formOneGrp.get('email').setValue(lowerCaseEmail);

    const obj = {
      ...this.formOneGrp.value,
      contact_details: this.contact_details,
      phone_number: this.contact_details[0].phone_number,
      countryCode: this.contact_details[0].country_code
    }
    console.log(obj);
    if (this.formOneGrp.valid && this.isContactValid()) {
      this.authService.clinicSignUp(obj);
      console.log(this.formOneGrp)
    }
    else {
      this.notification.show("Invalid Form", "OK", 5000);
    }
  }

  onSubmitFormTwo() {
    this.formTwoGrp.controls["speciality"].setValue(this.myControl1.value);
    this.formTwoGrp.controls["city"].setValue(this.myControl2.value);
    this.formTwoGrp.controls["state"].setValue(this.myControl3.value);

    this.isFormTwoSubmitted = true;
    this.formTwoClass = 'invalid-form';
    if (this.formTwoGrp.valid && this.myControl3.valid && this.myControl1.valid && this.myControl2.valid) {
      if (this.social_handle[0].name || this.social_handle[0].url_handle) {
        if (this.isSocialValid()) {
          this.stepper.selectedIndex = 2;
          console.log(this.formTwoGrp);
          console.log("646")
        }else{
          this.notification.show("Invalid Form", "OK", 5000);
        }
      } else {
        console.log("649")
        this.stepper.selectedIndex = 2;
        console.log(this.formTwoGrp);
      }
    } else {
      this.notification.show("Invalid Form", "OK", 5000);
    }
  }

  signUp() {
    this.isFormThreeSubmitted = true;
    this.formThreeClass = 'invalid-form';
    const obj = {
      ...this.formTwoGrp.value,
      social_handle: this.social_handle
    }
    const signUpObj = Object.assign({}, obj, this.formThreeGrp.value);
    console.log(this.formTwoGrp)
    console.log(this.formTwoGrp.valid, this.formThreeGrp.valid);
    if (this.formTwoGrp.valid && this.formThreeGrp.valid) {
      console.log(obj)
      console.log(signUpObj)
      this.authService.clinicCreate(signUpObj, 'create').then(() => {
        console.log(signUpObj);
        if (this.authService.imageData) {
          this.authService.uploadClinicLogo().subscribe(
            (a) => {
              console.log(a);
              console.log("yes send frm signup");
              this.authService.imageData = "";
            },
            error => {
              console.log(error);

            }
          );
        } else {
          console.log("no image uploaded")
        }
      })



      //this.signupservice.setobj(signUpObj);
      //this.router.navigate(['auth/confirmcode']);
      //console.log("routing code is passed");
    }
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options1.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options3.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnDestroy() {
    this.onSignUpexceptionStepper.unsubscribe();
  }

}
