import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HistoryTdahPatientsComponent } from '../components/history-tdah-patients/history-tdah-patients.component';
import { StatsComponent } from '../components/stats/stats.component';
import { RecentPatientsComponent } from '../components/recent-patients/recent-patients.component';
// import { ComponentsModule } from 'src/app/components/components.module';

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
        CommonModule
    ],
    declarations: [
        HomeComponent,
        StatsComponent,
        HistoryTdahPatientsComponent,
        RecentPatientsComponent
    ]
})
export class HomeModule { }
