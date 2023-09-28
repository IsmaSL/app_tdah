import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgChartsModule } from "ng2-charts";

import { MuseJsComponent } from "./muse-js.component";
import { HeadViewComponent } from "../components/head-view/head-view.component";

import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Muse',
            urls: [
                { title: 'Test', url: '' },
                { title: 'BAMZ-001-12-03-2023' },
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
        ComponentsModule
    ],
    providers: [],
})
export class MuseJsModule { }