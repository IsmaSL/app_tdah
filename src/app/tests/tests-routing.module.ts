import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TestsComponent } from "./tests.component";
import { SelectDeviceComponent } from "./select-device/select-device.component";
import { SelectTestComponent } from "./select-test/select-test.component";

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
                    title: 'Pruebas'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestsRoutingModule { }

export const routedComponents = [ TestsComponent ]