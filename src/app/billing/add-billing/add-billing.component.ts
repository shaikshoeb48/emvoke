import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Item } from './item.model';
import { BillingService } from '../billing.service';
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.scss']
})
export class AddBillingComponent implements OnInit {
  currency = {
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    "AMD": "Armenian Dram",
    "ANG": "Netherlands Antillean Guilder",
    "AOA": "Angolan Kwanza",
    "ARS": "Argentine Peso",
    "AUD": "Australian Dollar",
    "AWG": "Aruban Florin",
    "AZN": "Azerbaijani Manat",
    "BAM": "Bosnia-Herzegovina Convertible Mark",
    "BBD": "Barbadian Dollar",
    "BDT": "Bangladeshi Taka",
    "BGN": "Bulgarian Lev",
    "BHD": "Bahraini Dinar",
    "BIF": "Burundian Franc",
    "BMD": "Bermudan Dollar",
    "BND": "Brunei Dollar",
    "BOB": "Bolivian Boliviano",
    "BRL": "Brazilian Real",
    "BSD": "Bahamian Dollar",
    "BTC": "Bitcoin",
    "BTN": "Bhutanese Ngultrum",
    "BWP": "Botswanan Pula",
    "BYN": "Belarusian Ruble",
    "BZD": "Belize Dollar",
    "CAD": "Canadian Dollar",
    "CDF": "Congolese Franc",
    "CHF": "Swiss Franc",
    "CLF": "Chilean Unit of Account (UF)",
    "CLP": "Chilean Peso",
    "CNH": "Chinese Yuan (Offshore)",
    "CNY": "Chinese Yuan",
    "COP": "Colombian Peso",
    "CRC": "Costa Rican Colón",
    "CUC": "Cuban Convertible Peso",
    "CUP": "Cuban Peso",
    "CVE": "Cape Verdean Escudo",
    "CZK": "Czech Republic Koruna",
    "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone",
    "DOP": "Dominican Peso",
    "DZD": "Algerian Dinar",
    "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa",
    "ETB": "Ethiopian Birr",
    "EUR": "Euro",
    "FJD": "Fijian Dollar",
    "FKP": "Falkland Islands Pound",
    "GBP": "British Pound Sterling",
    "GEL": "Georgian Lari",
    "GGP": "Guernsey Pound",
    "GHS": "Ghanaian Cedi",
    "GIP": "Gibraltar Pound",
    "GMD": "Gambian Dalasi",
    "GNF": "Guinean Franc",
    "GTQ": "Guatemalan Quetzal",
    "GYD": "Guyanaese Dollar",
    "HKD": "Hong Kong Dollar",
    "HNL": "Honduran Lempira",
    "HRK": "Croatian Kuna",
    "HTG": "Haitian Gourde",
    "HUF": "Hungarian Forint",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli New Sheqel",
    "IMP": "Manx pound",
    "INR": "Indian Rupee",
    "IQD": "Iraqi Dinar",
    "IRR": "Iranian Rial",
    "ISK": "Icelandic Króna",
    "JEP": "Jersey Pound",
    "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar",
    "JPY": "Japanese Yen",
    "KES": "Kenyan Shilling",
    "KGS": "Kyrgystani Som",
    "KHR": "Cambodian Riel",
    "KMF": "Comorian Franc",
    "KPW": "North Korean Won",
    "KRW": "South Korean Won",
    "KWD": "Kuwaiti Dinar",
    "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstani Tenge",
    "LAK": "Laotian Kip",
    "LBP": "Lebanese Pound",
    "LKR": "Sri Lankan Rupee",
    "LRD": "Liberian Dollar",
    "LSL": "Lesotho Loti",
    "LYD": "Libyan Dinar",
    "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu",
    "MGA": "Malagasy Ariary",
    "MKD": "Macedonian Denar",
    "MMK": "Myanma Kyat",
    "MNT": "Mongolian Tugrik",
    "MOP": "Macanese Pataca",
    "MRO": "Mauritanian Ouguiya (pre-2018)",
    "MRU": "Mauritanian Ouguiya",
    "MUR": "Mauritian Rupee",
    "MVR": "Maldivian Rufiyaa",
    "MWK": "Malawian Kwacha",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical",
    "NAD": "Namibian Dollar",
    "NGN": "Nigerian Naira",
    "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone",
    "NPR": "Nepalese Rupee",
    "NZD": "New Zealand Dollar",
    "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa",
    "PEN": "Peruvian Nuevo Sol",
    "PGK": "Papua New Guinean Kina",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "PLN": "Polish Zloty",
    "PYG": "Paraguayan Guarani",
    "QAR": "Qatari Rial",
    "RON": "Romanian Leu",
    "RSD": "Serbian Dinar",
    "RUB": "Russian Ruble",
    "RWF": "Rwandan Franc",
    "SAR": "Saudi Riyal",
    "SBD": "Solomon Islands Dollar",
    "SCR": "Seychellois Rupee",
    "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona",
    "SGD": "Singapore Dollar",
    "SHP": "Saint Helena Pound",
    "SLL": "Sierra Leonean Leone",
    "SOS": "Somali Shilling",
    "SRD": "Surinamese Dollar",
    "SSP": "South Sudanese Pound",
    "STD": "São Tomé and Príncipe Dobra (pre-2018)",
    "STN": "São Tomé and Príncipe Dobra",
    "SVC": "Salvadoran Colón",
    "SYP": "Syrian Pound",
    "SZL": "Swazi Lilangeni",
    "THB": "Thai Baht",
    "TJS": "Tajikistani Somoni",
    "TMT": "Turkmenistani Manat",
    "TND": "Tunisian Dinar",
    "TOP": "Tongan Pa'anga",
    "TRY": "Turkish Lira",
    "TTD": "Trinidad and Tobago Dollar",
    "TWD": "New Taiwan Dollar",
    "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia",
    "UGX": "Ugandan Shilling",
    "USD": "United States Dollar",
    "UYU": "Uruguayan Peso",
    "UZS": "Uzbekistan Som",
    "VEF": "Venezuelan Bolívar Fuerte",
    "VND": "Vietnamese Dong",
    "VUV": "Vanuatu Vatu",
    "WST": "Samoan Tala",
    "XAF": "CFA Franc BEAC",
    "XAG": "Silver Ounce",
    "XAU": "Gold Ounce",
    "XCD": "East Caribbean Dollar",
    "XDR": "Special Drawing Rights",
    "XOF": "CFA Franc BCEAO",
    "XPD": "Palladium Ounce",
    "XPF": "CFP Franc",
    "XPT": "Platinum Ounce",
    "YER": "Yemeni Rial",
    "ZAR": "South African Rand",
    "ZMW": "Zambian Kwacha",
    "ZWL": "Zimbabwean Dollar"
  }
  addBillingItemForm: FormGroup;
  addGstForm: FormGroup;
  countryCurrencyCode: any;
  itemCategoryData = [];
  defaultCurrency = "INR";
  items: Item[] = [];
  control: FormArray;
  updateItem: boolean = false;
  submitted: boolean = false;
  editAll: boolean = false;
  editTermsAndCondition: boolean = false;
  editGst: boolean = false;
  GstNo = "";
  csvContent: string;
  accountId: string;
  defaultTermsAndCondition: string = "";
  defaultCategory;
  accountExist = false;

  billingAccountForm: FormGroup;
  billingFormData;
  submittedBillingForm = false;
  constructor(private fb: FormBuilder, private billingService: BillingService) { }

  ngOnInit() {

    this.accountId = localStorage.getItem('clinicId')
    this.countryCurrencyCode = Object.keys(this.currency);
    this.initiateForms();

  }


  initiateForms() {

    this.billingAccountForm = new FormGroup({
      registeredName: new FormControl('', Validators.required),
      gstin: new FormControl('', Validators.required),
      currency: new FormControl('INR', Validators.required),
      fssaiLicense: new FormControl('', Validators.required),
      drugLicense: new FormControl('', Validators.required),
      ifscCode: new FormControl(''),
      bankAccountNo: new FormControl(''),
      phoneNo: new FormControl('', Validators.required),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      panNo: new FormControl('', Validators.required),
      disclaimer: new FormControl(''),
      tagline: new FormControl(''),
      isEditable: new FormControl(true)

    })

    this.addBillingItemForm = new FormGroup({
      billingItemData: new FormGroup({
        'itemHSNCode': new FormControl(null, Validators.required),
        'itemCategory': new FormControl(this.itemCategoryData[0], Validators.required),
        'itemName': new FormControl(null, Validators.required),
        'itemRate': new FormControl(null, [
          Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'itemGst': new FormControl(null, [
          Validators.required, this.percentageCheck.bind(this)]),
        'itemCess': new FormControl(null)
      }),
      tableRows: this.fb.array([])
    });

    this.addGstForm = new FormGroup({
      'gstNo': new FormControl(this.GstNo, Validators.required)
    })
    this.addGstForm.controls['gstNo'].disable();
    //get account details
    this.billingService.getAccountDetails().subscribe((result) => {
      const rawData = atob(result.Data)
      if (rawData.length) {
        const account = JSON.parse(rawData)
        const accountDetails = account.account_details
        if (Object.keys(accountDetails).length) {
          this.accountExist = true;
          this.billingAccountForm.patchValue(accountDetails)
          this.billingAccountForm.get('isEditable').setValue(false);
        }

      }
    },
      (error) => {
        console.log("No account found")
      })
    this.getAllItems();
  }


  get billingform() { return this.billingAccountForm.controls }

  getAllItems() {
    // this.items = this.billingService.getItems();
    this.billingService.getItemCategory().subscribe((result) => {
      if (result.Data) {
        const rawData = atob(result.Data)
        const itemCategoryData = JSON.parse(rawData)
        // this.itemCategoryData = [...itemCategoryData]
        itemCategoryData.forEach((item) => {
          this.itemCategoryData[item._id] = item.category
        })
        // this.defaultCategory = this.itemCategoryData.slice(0,1)

        this.billingService.getItems().subscribe((result) => {
          const rawData = atob(result.Data)
          if (rawData.length) {
            let items = JSON.parse(rawData)
            items.forEach((data) => {
              let batch_details = data.batch_details
              let category = this.itemCategoryData[data.item_category]
              // console.log(data.item_category)
              let t = new Item(data._id, data.item_HSN_Code, category, data.item_name, batch_details.item_rate, batch_details.item_gst, batch_details.item_cess)
              this.items.push(t)
              this.addRow(data.item_HSN_Code, category, data.item_name, batch_details.item_rate, batch_details.item_gst, batch_details.item_cess);
            })
          }

        },
          err => {
            console.log(err)
          })

      }
    })

  }

  //functions related to billing account


  submitAccountDetails() {
    this.submittedBillingForm = true;
    console.log(this.billingAccountForm)
    if (this.billingAccountForm.invalid) {
      return;
    }

    this.createAndUpdateBillingForm(this.billingAccountForm.value, 'create')
    this.billingAccountForm.get('isEditable').setValue(false);
  }

  onEditBillingAccountDetails() {
    this.billingAccountForm.get('isEditable').setValue(true);

  }

  onUpdateBillingAccountDetails() {
    this.submittedBillingForm = true;
    console.log(this.billingAccountForm)
    if (this.billingAccountForm.invalid) {
      return;
    }

    this.createAndUpdateBillingForm(this.billingAccountForm.value, 'update')
    this.billingAccountForm.get('isEditable').setValue(false);

  }


  createAndUpdateBillingForm(data, type) {
    const billingObject = {
      "account_details": data
    }
    if (type == 'create') {
      this.accountExist = true;
      this.billingService.createBillingAccount(billingObject).subscribe((result) => {
        console.log("Billing account created.")
      })
    }
    else if (type == 'update') {
      this.billingService.updateBillingAccount(billingObject).subscribe((result) => {
        console.log("Billing account updated.");
      });
    }

  }

  //functions related to pricing template
  get getFormControls() {
    const control = this.addBillingItemForm.get('tableRows') as FormArray;
    return control;
  }

  addRow(itemHSNCode, itemCat, itemName, itemRate, itemGst, itemCess) {
    const control = this.addBillingItemForm.get('tableRows') as FormArray;
    control.push(this.initiateForm(itemHSNCode, itemCat, itemName, itemRate, itemGst, itemCess));
  }

  initiateForm(itemHSNCode, itemCat, itemName, itemRate, itemGst, itemCess): FormGroup {
    return this.fb.group({
      itemHSNCode: [itemHSNCode, Validators.required],

      itemCategory: [itemCat, Validators.required],
      itemName: [itemName, Validators.required],
      itemRate: [itemRate, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
      itemGst: [itemGst, [
        Validators.required, this.percentageCheck.bind(this)]],
      itemCess: [itemCess],
      isEditable: [false]
    });
  }

  onAddNewItem() {
    this.submitted = true;
    if (this.addBillingItemForm.get(['billingItemData']).invalid) {
      return;
    }
    else {
      const item = this.addBillingItemForm.value.billingItemData;
      this.addItem(item.itemHSNCode, item.itemCategory, item.itemName, item.itemRate, item.itemGst, item.itemCess)
      this.addBillingItemForm.get(['billingItemData']).reset({
        itemCategory: this.itemCategoryData[0]
      })
      this.submitted = false;

    }

  }

  onEditItem(row: FormGroup) {
    row.get('isEditable').setValue(true);

  }

  onUpdateItem(row: FormGroup, index: number) {
    this.updateItem = true;
    if (row.invalid) {
      return;
    }
    else if (row.dirty) {
      row.markAsPristine()
      row.get('isEditable').setValue(false);
      let newData = this.addBillingItemForm.get('tableRows').value[index];
      let itemId = this.items[index]._id
      let updatedItem = new Item(itemId, newData.itemHSNCode, newData.itemCategory, newData.itemName, newData.itemRate, newData.itemGst, newData.itemCess);
      this.items[index] = updatedItem;
      this.putItem(updatedItem)
      this.updateItem = false;

    }
    else {
      row.get('isEditable').setValue(false);
      this.updateItem = false;
    }

    const control = this.addBillingItemForm.get('tableRows') as FormArray;
    let isAllRowSaved = true
    control.controls.forEach((data) => {
      if (data['controls']['isEditable']['value'] == true) {
        isAllRowSaved = false
      }
    })
    if (isAllRowSaved) {
      this.editAll = false

    }

  }


  deleteRow(index: number) {
    const control = this.addBillingItemForm.get('tableRows') as FormArray;
    control.removeAt(index);
    const id = this.items[index]._id
    this.billingService.deleteItem(id).subscribe((result) => {
      console.log("Item successfully deleted");
    },
      err => {
        console.log(err)
      })
    this.items.splice(index, 1)
  }


  onEditAll() {
    this.editAll = true;
    const control = this.addBillingItemForm.get('tableRows') as FormArray;
    control.controls.forEach((data) => {
      data['controls']['isEditable']['value'] = true;
    })
  }


  onSaveAll() {
    const control = this.addBillingItemForm.get('tableRows') as FormArray;
    this.updateItem = true;

    if (control.invalid) {
      return;
    }
    else {
      control.controls.forEach((singleControl, index) => {
        if (singleControl.dirty) {
          singleControl.markAsPristine();
          let newData = singleControl.value;
          let itemId = this.items[index]._id
          let updatedItem = new Item(itemId, newData.itemHSNCode, newData.itemCategory, newData.itemName, newData.itemRate, newData.itemGst, newData.itemCess);
          this.items[index] = updatedItem;
          this.putItem(updatedItem)
        }
      })
      control.controls.forEach((data) => {
        data['controls']['isEditable']['value'] = false;
      })
      this.editAll = false;
      this.updateItem = false;

    }


  }



  //adds item to DB
  addItem(itemHSN, itemCategory, itemName, itemRate, itemGst, itemCess) {
    const item = {
      item_name: itemName,
      item_HSN_Code: itemHSN,
      batch_details: {
        item_rate: itemRate,
        item_gst: itemGst,
        item_cess: itemCess,
      },
      is_taxable: "Yes"
    }

    let itemCategoryId = this.getItemCategoryKey(itemCategory)
    this.billingService.createItem(item, itemCategoryId).subscribe((data) => {
      let id = JSON.parse(atob(data.Data))
      const newItem = new Item(id, itemHSN, itemCategory, itemName, itemRate, itemGst, itemCess);
      this.items.push(newItem)
      this.addRow(itemHSN, itemCategory, itemName, itemRate, itemGst, itemCess)
    },
      (err) => {
        console.log(err)
      })


  }

  //update Item
  putItem(updateItem: Item) {
    let updateItemCategoryId = this.getItemCategoryKey(updateItem.itemCategory)

    const item = {
      item_name: updateItem.itemName,
      item_HSN_Code: updateItem.itemHSNCode,
      batch_details: {
        item_rate: updateItem.itemRate,
        item_gst: updateItem.itemGSTAmount,
        item_cess: updateItem.itemCESS
      },
      item_category: updateItemCategoryId,
      is_taxable: "Yes"
    }

    this.billingService.updateItem(item, updateItem._id).subscribe((result) => {
      console.log("Item successfully updated")
    },
      err => {
        console.log(err)
      })
  }


  onCurrencyOptionsSelected(value: string) {
    console.log("the selected value is " + value);
    this.defaultCurrency = value;
  }

  percentageCheck(control: FormControl): { [s: string]: boolean } {

    if (control.value >= 0 && control.value <= 100) {
      return null;
    }
    else {
      return { 'wrongPercentageValue': true }
    }
  }


  onAddTermsAndCondition(value: string) {
    this.defaultTermsAndCondition = value;
    this.editTermsAndCondition = false;

  }

  onEditTermsAndCondition() {
    this.editTermsAndCondition = true;
  }

  onEditGst() {
    this.addGstForm.controls['gstNo'].enable();
    this.editGst = true;
  }


  onSaveGst() {
    this.editGst = false;
    this.addGstForm.controls['gstNo'].disable();
    this.GstNo = this.addGstForm.get('gstNo').value
  }

  onExportData() {
    this.billingService.exportData(this.items);
  }

  //itemCategorykey
  getItemCategoryKey(category) {
    return Object.keys(this.itemCategoryData).find(key =>
      this.itemCategoryData[key] == category
    )
  }


  //used to import csv
  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    const tempCsvData = this.csvContent.split('\n')
    let finalCsvData = []
    tempCsvData.shift()
    tempCsvData.pop()
    tempCsvData.forEach((data, index) => {
      let indvidualData = data.split(",")
      let listData: any[] = []
      indvidualData.forEach((items) => {
        items = items.replace(/"([^"]+(?="))"/g, '$1');
        listData.push(items)
      })
      finalCsvData.push(listData)
    })
    finalCsvData.forEach((data) => {

      let itemHSN = data[0]
      let itemCategory = data[1]
      let itemName = data[2]
      let itemRate = +data[3]
      let itemGst = +data[4]
      let itemCess = null
      if (!(isNaN(+data[5]))) {
        itemCess = +data[5]
      }
      this.addItem(itemHSN, itemCategory, itemName, itemRate, itemGst, itemCess)

    })
  }





  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad.bind(this);
      fileReader.readAsText(fileToRead, "UTF-8");
    }
  }

}
