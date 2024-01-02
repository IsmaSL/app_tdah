import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AsrsComponent } from './asrs/asrs.component';
import { WursComponent } from './wurs/wurs.component';
import { MdqComponent } from './mdq/mdq.component';
import { CtComponent } from './ct/ct.component';
import { MadrsComponent } from './madrs/madrs.component';
import { HadsComponent } from './hads/hads.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'ASRS-form',
                component: AsrsComponent,
                data: {
                    title: 'Formulario ASRS'
                },
            },
            {
                path: 'WURS-form',
                component: WursComponent,
                data: {
                    title: 'Formulario WURS'
                },
            },
            {
                path: 'MDQ-form',
                component: MdqComponent,
                data: {
                    title: 'Formulario MDQ'
                },
            },
            {
                path: 'CT-form',
                component: CtComponent,
                data: {
                    title: 'Formulario CT'
                },
            },
            {
                path: 'MADRS-form',
                component: MadrsComponent,
                data: {
                    title: 'Formulario MADRS'
                },
            },
            {
                path: 'HADS-form',
                component: HadsComponent,
                data: {
                    title: 'Formulario HADS'
                },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsTestRoutingModule { }

// export const routedComponents = [  ]