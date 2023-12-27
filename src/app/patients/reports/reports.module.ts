import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { ReportsComponent } from "./reports.component";

import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Reporte',
            urls: [
                { title: 'Pacientes', url: '/Pacientes' },
                { title: 'Reporte' }
            ]
        },
        component: ReportsComponent
    }
];

@NgModule({
    declarations: [
        ReportsComponent,
    ],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule.forChild(routes),
        NgChartsModule,
        ComponentsModule,
        FormsModule
    ],
})

export class ReportsModule { }