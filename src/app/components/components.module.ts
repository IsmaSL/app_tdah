import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { HistoryTdahTestsComponent } from "./history-tdah-tests/history-tdah-tests.component";
import { RecentPatientsComponent } from "./recent-patients/recent-patients.component";
import { TableResultsTestComponent } from './table-results-test/table-results-test.component';
import { EditorComponent } from "./editor/editor.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgChartsModule,
        QuillModule.forRoot(),
    ],
    exports: [
        HistoryTdahTestsComponent,
        RecentPatientsComponent,
        TableResultsTestComponent,
        EditorComponent
    ],
    declarations: [
        HistoryTdahTestsComponent,
        RecentPatientsComponent,
        TableResultsTestComponent,
        EditorComponent
    ],
})
export class ComponentsModule { }