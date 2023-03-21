import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DevicesComponent } from './devices.component';
import { DeviceService } from './devices.service';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Dispositivos',
            urls: [
                { title: 'Dispositivos', url: '/devices' },
                { title: 'Inicio' }
            ]
        },
        component: DevicesComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NgbModule,
        CommonModule
    ],
    declarations: [
        DevicesComponent
    ],
    providers: [
        DeviceService
    ]
})
export class DevicesModule { }