import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/services/notification.service';
import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  
  adult=[
    // {name:"Influenza inactivated (IIV) orInfluenza recombinant (RIV)"},
    // {name: "Influenza live attenuated(LAIV)"},{name:"Tetanus, diphtheria, pertussis(Tdap or Td)"},
    // {name:"Measles, mumps, rubella(MMR)"},{name:"Varicella(VAR)"},{name:"Zoster recombinant(RZV)"},
    // {name:"Zoster live(ZVL)"},{name:"Human papillomavirus(HPV)"},{name:"Pneumococcal conjugate(PCV13)"},
    // {name:"Pneumococcal polysaccharide(PPSV23)"},{name:"Hepatitis A(HepA)"},{name:"Hepatitis B(HepB)"},
    // {name:"Meningococcal A, C, W, Y(MenACWY) "},{name:"Meningococcal B(MenB)"},{name:" Haemophilus influenzae type b(Hib)"}
  ];
  
  pregnancyChart = [
    {name:"Seasonal TIV",type:"inactivated",recommended:"yes",schedule:"1 dose anually",dosage:"0.5 ml",route:"intramuscular",site:"upperArm(deltoid muscle)"},
    {name:"H1N1",type:"inactivated",recommended:"yes"},
    {name:"monovalent H1N1 vaccine",type:"inactivated",recommended:"yes"},
    {name:"InfluenZa LAIV",type:"inactivated",recommended:"yes"}
  ];
   
child=[{name:" Hepatitis B (HepB)→"},
{name:" Rotavirus (RV) RV1 (2-dose series); RV5 (3-dose series)"},
{name:"Diphtheria, tetanus, & acellular pertussis (DTaP: <7 yrs)"},
{name:" Haemophilus influenzae type b (Hib)"},
{name:"Pneumococcal conjugate .(PCV13)"},
{name:"Inactivated poliovirus (IPV: <18 yrs)"},
{name:"Influenza (IIV) Influenza (LAIV)"},
{name:" Measles, mumps, rubella (MMR)"},
{name:"Varicella (VAR)"},
{name:" Hepatitis A (HepA)"},
{name:"Tetanus, diphtheria, & acellular pertussis (Tdap: ≥7 yrs)"},
{name:"Human papillomavirus(HPV)"},
{name:"Meningococcal(MenACWY-D: ≥9 mos; MenACWY-CRM: ≥2 mos)"},
{name:"Meningococcal B "},
{name:"Pneumococcal polysaccharide(PPSV23)"},
{name:"Hepatitis B(HepB)	"},
{name:"Rotavirus (RV) RV1 (2-dose series); RV5 (3-dose series)"},
{name:"Diphtheria, tetanus, & acellular pertussis(DTaP: <7 yrs)	"},
{name:"Haemophilus influenzae type b (Hib)"},
{name:"Pneumococcal conjugate(PCV13)"},
{name:"Inactivated poliovirus(IPV: <18 yrs)"},
{name:"Influenza (IIV) Influenza (LAIV)"},
{name:"Measles, mumps, rubella (MMR)"},
{name:"Varicella (VAR)"},
{name:"Hepatitis A (HepA)"},
{name:"Tetanus, diphtheria, & acellular pertussis(Tdap: ≥7 yrs)"},
{name:"Human papillomavirus (HPV)"},
{name:"Meningococcal (MenACWY-D: ≥9 mos; MenACWY-CRM: ≥2 mos)"},
{name:"Meningococcal B (MenB)"},
{name:" Pneumococcal polysaccharide(PPSV23)"},
];
travel = [
  {name:"adenovirus vaccine, type 4, live, oral"},
  {name:"adenovirus vaccine, type 7, live, oral"},
  {name:"adenovirus vaccine, unspecified formulation"},
  {name:"anthrax vaccine"},
  {name:"Bacillus Calmette-Guerin vaccine"},
  {name:"botulinum antitoxin"},
  {name:" cholera vaccine, unspecified formulation"},
  {name:"cytomegalovirus immune globulin, intravenous"},
  {name:"dengue fever vaccine"}
]; 

newVaccineSource=[{
  "name": "ADENO",
  "options": [
    {
      "option_name": "Adenovirus types 4 and 7",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "adenovirus, type 4",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "adenovirus, type 7",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "adenovirus, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "ANTHRAX",
  "options": [
    {
      "option_name": "anthrax",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "Bacille Calmette Guerin (BCG)",
  "options": [
    {
      "option_name": "BCG",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [0]
},
{
  "name": "DENGUE",
  "options": [
    {
      "option_name": "dengue fever",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "Diphtheria, tetanus, & acellular pertussis (DTAP)",
  "options": [
    {
      "option_name": "DTP",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTP-Hib-Hep B",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP, 5 pertussis antigens",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-Hep B-IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-Hib-IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-IPV-HIB-HEP B, historical",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP,IPV,Hib,HepB",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTAP/IPV/HIB - non-US",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTP-Hib",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DT (pediatric)",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-Hib",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [2,4,6,15,18]
},
{
  "name": "FLU",
  "options": [
    {
      "option_name": "influenza, live, intranasal",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza, high dose seasonal",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza, seasonal, injectable, preservative free",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza, seasonal, injectable",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, seasonal, intradermal, preservative free",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, live, intranasal, quadrivalent",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, split (incl. purified surface antigen)",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, injectable, quadrivalent, preservative free",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza nasal, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza, injectable, MDCK, preservative free",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, recombinant, injectable, preservative free",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, injectable, quadrivalent",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, whole",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza, injectable,quadrivalent, preservative free, pediatric",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, intradermal, quadrivalent, preservative free",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, trivalent, adjuvanted",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza, injectable, MDCK, preservative free, quadrivalent",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, recombinant, quadrivalent,injectable, preservative free",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza, injectable, MDCK, quadrivalent, preservative",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza, Southern Hemisphere",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, high-dose, quadrivalent",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "influenza, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": [6]
},
{
  "name": "H1N1 flu",
  "options": [
    {
      "option_name": "novel",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Novel influenza-H1N1-09, preservative-free",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Novel influenza-H1N1-09",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Novel Influenza-H1N1-09, all formulations",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": []
},
{
  "name": "H5N1 flu",
  "options": [
    {
      "option_name": "influenza, H5N1-1203",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Influenza A monovalent (H5N1), ADJUVANTED-2013",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": []
},
{
  "name": "Haemophilus influenzae type b (HIB)",
  "options": [
    {
      "option_name": "DTP-Hib-Hep B",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-Hib-IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-IPV-HIB-HEP B, historical",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP,IPV,Hib,HepB",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Meningococcal C/Y-HIB PRP",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hib, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTAP/IPV/HIB - non-US",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTP-Hib",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hib (PRP-D)",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hib (HbOC)",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hib (PRP-T)",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hib (PRP-OMP)",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-Hib",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hib-Hep B",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [2,4,6,12]
},
{
  "name": "Human papillomavirus (HPV)",
  "options": [
    {
      "option_name": "HPV, bivalent",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "HPV, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "HPV9",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "HPV, quadrivalent",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [108]
},
{
  "name": "Hep E",
  "options": [
    {
      "option_name": "Hep E",
      "option_status": "Never Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": []
},
{
  "name": "Hepatitis A (HepA)",
  "options": [
    {
      "option_name": "Hep A-Hep B",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep A-Hep B, pediatric/adolescent",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep A, pediatric, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep A, adult",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep A, ped/adol, 2 dose",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep A, ped/adol, 3 dose",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep A, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [12]
},
{
  "name": "Hepatitis B (HepB)",
  "options": [
    {
      "option_name": "Hep B, adolescent or pediatric",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTP-Hib-Hep B",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep A-Hep B",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-Hep B-IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-IPV-HIB-HEP B, historical",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP,IPV,Hib,HepB",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "HepB-CpG",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep A-Hep B, pediatric/adolescent",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep B, adolescent/high risk infant",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep B, adult",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep B, dialysis",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hep B, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Hib-Hep B",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [0,1,6]
},
{
  "name": "Hepatitis C (HepC)",
  "options": [
    {
      "option_name": "Hep C",
      "option_status": "Never Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "Japanese encephalitis",
  "options": [
    {
      "option_name": "Japanese Encephalitis, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Japanese Encephalitis IM",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Japanese encephalitis SC",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "Lyme disease",
  "options": [
    {
      "option_name": "Lyme disease",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "Meningococcal",
  "options": [
    {
      "option_name": "meningococcal C conjugate",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "meningococcal ACWY, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "meningococcal MCV4P",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Meningococcal MCV4O",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "meningococcal MCV4, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Meningococcal C/Y-HIB PRP",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "meningococcal MPSV4",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": []
},
{
  "name": "Measles, mumps, rubella (MMR)",
  "options": [
    {
      "option_name": "MMR",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "M/R",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "measles",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "rubella",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "mumps",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "rubella/mumps",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "MMRV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [12,48]
},
{
  "name": "Meningococcal B (MenB) MeningB",
  "options": [
    {
      "option_name": "meningococcal B, recombinant",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "meningococcal B, OMV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "meningococcal B, unspecified",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time":[]
},
{
  "name": "POLIO",
  "options": [
    {
      "option_name": "OPV",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-Hep B-IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-Hib-IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-IPV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP-IPV-HIB-HEP B, historical",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTaP,IPV,Hib,HepB",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DTAP/IPV/HIB - non-US",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DT, IPV adsorbed",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "polio, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [2,4,6,48]
},
{
  "name": "Plague",
  "options": [
    {
      "option_name": "plague",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "Pneumococcal conjugate (PCV)",
  "options": [
    {
      "option_name": "pneumococcal conjugate PCV 7",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Pneumococcal conjugate PCV 13",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Pneumococcal Conjugate, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "PCV10",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [2,4,6,12]
},
{
  "name": "Pneumococcal polysaccharide (PneumoPPV)",
  "options": [
    {
      "option_name": "pneumococcal polysaccharide PPV23",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [2,4,6,12]
},
{
  "name": "RABIES",
  "options": [
    {
      "option_name": "Rabies - IM Diploid cell culture",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Rabies - IM fibroblast culture",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "rabies, intramuscular injection",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "rabies, intradermal injection",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "rabies, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "ROTAVIRUS (RV)",
  "options": [
    {
      "option_name": "rotavirus, pentavalent",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "rotavirus, monovalent",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "rotavirus, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "rotavirus, tetravalent",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [2,4,6]
},
{
  "name": "Tetanus, diphtheria, & acellular pertussis (TDAP)",
  "options": [
    {
      "option_name": "Tdap",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [132]
},
{
  "name": "TYPHOID",
  "options": [
    {
      "option_name": "typhoid, ViCPs",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "typhoid, oral",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "typhoid, parenteral",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "typhoid, parenteral, AKD (U.S. military)",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "typhoid, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "Td",
  "options": [
    {
      "option_name": "Td (adult), 2 Lf tetanus toxoid, preservative free, adsorbed",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Td (adult), 5 Lf tetanus toxoid, preservative free, adsorbed",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Td (adult)",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Td(adult) unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "DT, IPV adsorbed",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Td, adsorbed, preservative free, adult use, Lf unspecified",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "VACCINIA",
  "options": [
    {
      "option_name": "vaccinia (smallpox) diluted",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "vaccinia (smallpox)",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "VARICELLA (VAR)",
  "options": [
    {
      "option_name": "varicella",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "MMRV",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": ['child'],
  "time": [12,48]
},
{
  "name": "VEE",
  "options": [
    {
      "option_name": "VEE, live",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "VEE, inactivated",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "VEE, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "YELLOWFEVER",
  "options": [
    {
      "option_name": "Yellow fever vaccine - alt",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "Yellow fever, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "yellow fever",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "ZOSTER",
  "options": [
    {
      "option_name": "zoster live",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "zoster recombinant",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "zoster, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
},
{
  "name": "cholera",
  "options": [
    {
      "option_name": "cholera, WC-rBS",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "cholera, BivWC",
      "option_status": "Non-US",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "cholera, live attenuated",
      "option_status": "Active",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    },
    {
      "option_name": "cholera, unspecified formulation",
      "option_status": "Inactive",
      "option_time": [],
      "option_root": "",
      "option_dosage_per_delivery": ""
    }
  ],
  "category": [],
  "time": []
}]

vaccineSource=[
  {name:"Influenza inactivated (IIV) orInfluenza recombinant (RIV)",category:['all-vaccines','adult','pregnancy','travel','child']},
  {name: "Influenza live attenuated(LAIV)",category:['adult','all-vaccines','travel']},{name:"Tetanus, diphtheria, pertussis(Tdap or Td)",category:['adult','child']},
  {name:"Measles, mumps, rubella(MMR)",category:['child']},{name:"Varicella(VAR)",category:['adult']},{name:"Zoster recombinant(RZV)",category:['adult','travel']},
  {name:"Zoster live(ZVL)",category:['adult','travel']},{name:"Human papillomavirus(HPV)",category:['all-vaccines','adult']},{name:"Pneumococcal conjugate(PCV13)",category:['adult','travel','pregnancy']},
  {name:"Pneumococcal polysaccharide(PPSV23)",category:['adult','all-vaccines','travel']},{name:"Hepatitis A(HepA)",category:['adult','child']},{name:"Hepatitis B(HepB)",category:['adult']},
  {name:"Meningococcal A, C, W, Y(MenACWY) ",category:['adult','travel']},{name:"Meningococcal B(MenB)",category:['travel']},{name:" Haemophilus influenzae type b(Hib)",category:['pregnancy']}
];

  serverUrl = `${environment.baseUrl}${environment.baseParameter}`;
  appointment_id = localStorage.getItem('appointment_id') ;
  patient_id = localStorage.getItem('patient_id') ;
  constructor(private http: HttpClient, private notification: NotificationService, private dialog: MatDialog,private _router:Router) { }

     /* Patient API's */
  getPatientVaccinesDetails(): Observable<any> {
      const token = localStorage.getItem('token');
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp' ,
        'X-Clinic-ID': localStorage.getItem('clinicId'),
        'X-Patient-ID' : this.patient_id,
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${this.serverUrl}/patient/patient-vaccines`, { headers: header });
    
  }


  updateAppointment(data): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'X-Clinic-ID' : localStorage.getItem('clinicId'),
      'X-Appointment-ID' : localStorage.getItem('appointment_id'),
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      'X-Doctor-ID' : localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp',
      'X-Patient-ID': localStorage.getItem('patient_id'),
      Authorization: `Bearer ${token}`
    });
    return this.http.patch<Event>(`${this.serverUrl}/appointment/patch`, data, { headers: header });
  }

  updatePatientVaccinations(data): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp' ,
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Patient-ID' : localStorage.getItem('patient_id'),
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.patch<any>(`${this.serverUrl}/patient/patch`, data, { headers: header });
  }

}