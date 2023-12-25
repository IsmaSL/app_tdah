import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AddPatientComponent } from './add-patient.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Nuevo Paciente',
            urls: [
                { title: 'Pacientes', url: '/Pacientes' },
                { title: 'Nuevo Paciente' }
            ]
        },
        component: AddPatientComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NgbModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        AddPatientComponent
    ],
})
export class AddPatientModule { }