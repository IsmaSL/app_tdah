import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PatientProfileComponent } from './patient-profile.component';

import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Perfil',
            urls: [
                { title: 'Pacientes', url: '/Pacientes' },
                { title: 'Perfil' }
            ]
        },
        component: PatientProfileComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NgbModule,
        CommonModule,
        ComponentsModule,
    ],
    declarations: [
        PatientProfileComponent,
    ],
})
export class PatientProfileModule { }