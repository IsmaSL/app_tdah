import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PatientsComponent } from './patients.component';
import { TablePatientsComponent } from '../../components/table-patients/table-patients.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Pacientes',
            urls: [
                { title: 'Pacientes', url: '/Pacientes' },
                { title: 'Inicio' }
            ]
        },
        component: PatientsComponent
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        NgbModule,
        NgxPaginationModule
    ],
    declarations: [
        PatientsComponent,
        TablePatientsComponent,
        FilterPipe
    ]
})
export class PatientsModule { }