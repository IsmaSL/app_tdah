import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TestsComponent } from "./tests.component";
import { SelectDeviceComponent } from "./select-device/select-device.component";
import { SelectTestComponent } from "./select-test/select-test.component";
import { SyncDeviceComponent } from "./sync-device/sync-device.component";
import { StartTestComponent } from "./start-test/start-test.component";

const routes: Routes = [
    {
        path: '',
        component: TestsComponent,
        data: {
            title: 'Iniciar Prueba'
        },
        children: [
            {
                path: 'devices',
                component: SelectDeviceComponent,
                data: {
                    title: 'Dispositivos'
                }
            },
            {
                path: 'tests',
                component: SelectTestComponent,
                data: {
                    title: 'Detalles del dispositivo'
                }
            },
            {
                path: 'sync',
                component: SyncDeviceComponent,
                data: {
                    title: 'Sincronizar Dispositivo'
                }
            },
            {
                path: 'start',
                component: StartTestComponent,
                data: {
                    title: 'Iniciar Prueba'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestsRoutingModule { }

export const routedComponents = [ TestsComponent ]