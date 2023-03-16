import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ChartsModule } from 'ng2-charts';
// import { ChartistModule } from 'ng-chartist';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { NgApexchartsModule } from "ng-apexcharts";

import { HomeComponent } from './home.component';
import { StatsComponent } from '../components/stats/stats.component';
// import { HistoryTdahTestsComponent } from '../components/history-tdah-tests/history-tdah-tests.component';
// import { RecentPatientsComponent } from '../components/recent-patients/recent-patients.component';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inicio',
      urls: [
        { title: 'Inicio', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    },
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // ChartsModule,
    // ChartistModule,
    // NgxChartsModule,
    // NgxDatatableModule,
    // NgApexchartsModule,
    ComponentsModule
  ],
  declarations: [
    HomeComponent,
    StatsComponent,
    // HistoryTdahTestsComponent,
    // RecentPatientsComponent,
  ]
})
export class HomeModule { }
