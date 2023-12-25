import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PrepareTestComponent } from "./prepare-test.component";
import { SelectDeviceComponent } from "./select-device/select-device.component";
import { SelectTestComponent } from "./select-test/select-test.component";
import { StartTestComponent } from "./start-test/start-test.component";

const routes: Routes = [
    {
        path: '',
        component: PrepareTestComponent,
        data: {
            title: 'Iniciar Prueba'
        },
        children: [
            {
                path: 'devices',
                component: SelectDeviceComponent,
                data: {
                    title: 'Dispositivos Disponibles'
                }
            },
            // {
            //     path: 'tests',
            //     component: SelectTestComponent,
            //     data: {
            //         title: 'Detalles del Dispositivo'
            //     }
            // },
            {
                path: 'start',
                component: StartTestComponent,
                data: {
                    title: 'Recomendaciones'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrepareTestRoutingModule { }

export const routedComponents = [ PrepareTestComponent ]