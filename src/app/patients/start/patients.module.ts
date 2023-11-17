import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PatientsComponent } from './patients.component';
import { TablePatientsComponent } from '../../components/table-patients/table-patients.component';

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
    ],
    declarations: [
        PatientsComponent,
        TablePatientsComponent,
    ]
})
export class PatientsModule { }