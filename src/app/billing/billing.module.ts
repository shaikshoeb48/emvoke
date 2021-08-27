import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddBillingComponent } from './add-billing/add-billing.component';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BillingOverviewComponent } from './billing-overview/billing-overview.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransactionFilterPipe } from './transaction-list/transaction-filter.pipe';

const billingRoutes: Routes = [
    {
        path: '', redirectTo: '/billing/addbilling', pathMatch: 'full'
    },
    {
        path: 'addbilling', component: AddBillingComponent
    },

    {
        path: 'transactionslist', component: TransactionListComponent
    },
    {
        path: 'billinghistory', component: BillingHistoryComponent
    }
    ,
    {
        path: 'billingoverview', component: BillingOverviewComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(billingRoutes),
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgxEchartsModule,
        CommonModule,
        NgxPaginationModule
    ],
    declarations: [
        AddBillingComponent,
        BillingHistoryComponent,
        BillingOverviewComponent,
        TransactionListComponent,
        TransactionFilterPipe
    ]
})
export class BillingModule { }
