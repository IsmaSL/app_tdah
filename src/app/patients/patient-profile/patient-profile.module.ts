import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { QuillModule } from 'ngx-quill';
// import { EditorComponent } from './editor/editor.component';

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
        // FormsModule,
        // CommonModule,
        RouterModule.forChild(routes),
        NgbModule,
        ComponentsModule,
        QuillModule.forRoot()
    ],
    declarations: [
        PatientProfileComponent,
        // EditorComponent
    ],
})
export class PatientProfileModule { }