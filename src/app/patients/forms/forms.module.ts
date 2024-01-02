import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { FormsTestRoutingModule } from "./forms.routing.module";

import { AsrsComponent } from './asrs/asrs.component';
import { WursComponent } from './wurs/wurs.component';
import { MdqComponent } from './mdq/mdq.component';
import { CtComponent } from './ct/ct.component';
import { MadrsComponent } from './madrs/madrs.component';
import { HadsComponent } from './hads/hads.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsTestRoutingModule
    ],
    declarations: [
        AsrsComponent,
        WursComponent,
        MdqComponent,
        CtComponent,
        MadrsComponent,
        HadsComponent
    ],
    providers: [

    ],
})
export class FormsTestModule { }