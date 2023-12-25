import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgChartsModule } from "ng2-charts";
import { FormsModule } from '@angular/forms';

import { MuseJsComponent } from "./muse-js.component";
import { HeadViewComponent } from "../components/head-view/head-view.component";

import { ComponentsModule } from 'src/app/components/components.module';

const test_nam: string = JSON.parse(localStorage.getItem('current_patient')).nombre;
const test_num: number = JSON.parse(localStorage.getItem('current_patient')).num_pruebas_prev + 1;

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Muse',
            urls: [
                { title: test_nam },
                { title: 'Prueba ' + test_num },
            ]
        },
        component: MuseJsComponent
    }
];

@NgModule({
    declarations: [
        MuseJsComponent,
        HeadViewComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        NgChartsModule,
        ComponentsModule,
        FormsModule
    ],
    providers: [],
})
export class MuseJsModule { }