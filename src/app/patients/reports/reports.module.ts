import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgChartsModule } from 'ng2-charts';

import { ReportsComponent } from "./reports.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Reporte',
            urls: [
                { title: 'Pacientes', url: '/Pacientes' },
                { title: 'Reporte'}
            ]
        },
        component: ReportsComponent
    }
];

@NgModule({
  imports: [
    NgbModule,
    RouterModule.forChild(routes),
    NgChartsModule,
  ],
  declarations: [
    ReportsComponent
  ],  
})

export class ReportsModule { }