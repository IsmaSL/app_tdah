import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from 'ng2-charts';

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
    ChartsModule,
  ],
  declarations: [
    ReportsComponent
  ],  
})

export class ReportsModule { }