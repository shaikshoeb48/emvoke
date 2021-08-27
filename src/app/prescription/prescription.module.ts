import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPrintModule } from 'ngx-print' ;
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode' ;

import { SharedAppointmentModule } from '../appointment/sharedappointment.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentService } from '../appointment/appointment.service';
import { PrescriptionComponent } from './prescription.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { FindingsComponent } from './findings/findings.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { PrescriptionService } from './prescription.service';
import { OtherFindingsComponent } from './other-findings/other-findings.component';
import { MedicineComponent } from './medicine/medicine.component';
import { InvestigationsComponent } from './investigations/investigations.component';
import { PrescriptionPdfComponent } from './prescription-pdf/prescription-pdf.component';
import { VaccinationComponent } from './Vaccination/vaccination.component'
import { ResizableDraggableComponent } from './resizable-draggable/resizable-draggable.component';
import { VaccinationService } from './Vaccination/vaccination.service'
import { SharedAuthModule } from '../auth/sharedauth.module';
import { CoreModule } from '../core/core.module'
import { VaccinemodalComponent } from '../core/components/vaccinemodal/vaccinemodal.component'
import { SelectvaccinemodalComponent } from '../core/components/selectvaccinemodal/selectvaccinemodal.component';
import { PreAppointmentComponent } from './pre-appointment/pre-appointment.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { GrowthComponent } from './growth/growth.component';
import { DevelopmentComponent } from './growth/development/development.component';
import { ChildGrowthComponent } from './growth/child-growth/child-growth.component' ;
import { NgxEchartsModule } from 'ngx-echarts';
import { GrowthService } from './growth/growth.service' ;
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { InvoiceComponent } from './invoice/invoice.component';
import { ExaminationComponent } from './growth/examination/examination.component';
import { MultiSelectorDropdownComponent } from './growth/examination/multi-selector-dropdown/multi-selector-dropdown.component' ;
import { FilterPipe} from './growth/examination/multi-selector-dropdown/filter.pipe';
import { InvoiceService } from './invoice.service';
import { VitalsoverwriteconfirmComponent } from './growth/examination/vitalsoverwriteconfirm/vitalsoverwriteconfirm.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportSkindairyCreateComponent } from './reports/report-skindairy-create/report-skindairy-create.component';
import { ReportSkindairyViewComponent } from './reports/report-skindairy-view/report-skindairy-view.component';
import { ReportsFilterPipe } from './reports/reports-filter.component';
import { ReportsService } from './reports/reports.service';

PlotlyModule.plotlyjs = PlotlyJS;


const prescriptionRoutes: Routes = [
  {
    path: '', component: PrescriptionComponent
  },
  {
    path: 'invoice', component: InvoiceComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(prescriptionRoutes),
    FormsModule,
    SharedModule,
    SharedAppointmentModule,
    SharedAuthModule,
    CoreModule,
    NgxPrintModule,
    NgxEchartsModule,
    NgxPrintModule,
    NgxQRCodeModule,
    PlotlyModule
    ],
  declarations: [
    PrescriptionComponent,
    SymptomsComponent,
    FindingsComponent,
    DiagnosisComponent,
    OtherFindingsComponent,
    MedicineComponent,
    InvestigationsComponent,
    PrescriptionPdfComponent,
    VaccinationComponent,
    VaccinemodalComponent,
    SelectvaccinemodalComponent,
    PreAppointmentComponent,
    ProceduresComponent,
    GrowthComponent,
    DevelopmentComponent,
    ChildGrowthComponent,
    InvoiceComponent,
    ExaminationComponent,
    MultiSelectorDropdownComponent,
    FilterPipe,
    VitalsoverwriteconfirmComponent,
    ReportsComponent,
    ReportSkindairyCreateComponent,
    ReportSkindairyViewComponent,
    ReportsFilterPipe,
    ResizableDraggableComponent

  ],
  providers: [
    AppointmentService,
    PrescriptionService,
    VaccinationService,
    GrowthService,
    InvoiceService,
    ReportsService
  ],
  entryComponents: [
    VaccinemodalComponent,
    SelectvaccinemodalComponent,
    PreAppointmentComponent
  ],
  exports : [PrescriptionPdfComponent]

})
export class PrescriptionModule { }
