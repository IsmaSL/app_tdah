import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { ChartistModule } from 'ng-chartist';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { NgApexchartsModule } from "ng-apexcharts";
import { NgChartsModule } from 'ng2-charts';

import { HistoryTdahTestsComponent } from "./history-tdah-tests/history-tdah-tests.component";
import { RecentPatientsComponent } from "./recent-patients/recent-patients.component";
import { TableResultsTestComponent } from './table-results-test/table-results-test.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // ChartistModule,
        // NgxChartsModule,
        // NgxDatatableModule,
        // NgApexchartsModule,
        NgChartsModule,
        // NgChartsModule
    ],
    exports: [
        HistoryTdahTestsComponent,
        RecentPatientsComponent,
        TableResultsTestComponent
    ],
    declarations: [
        HistoryTdahTestsComponent,
        RecentPatientsComponent,
        TableResultsTestComponent
    ],
})
 
export class ComponentsModule { }