import { NgModule } from '@angular/core';

import { AddPatientRoutingModule } from './add-patient-routing.module';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from "angular-feather";

/* App Root */
import { AddPatientComponent } from './add-patient.component';
import { NavbarComponent } from './navbar/navbar.component';

/* Feature Components */
import { PersonalComponent } from './personal/personal.component';
import { WorkComponent } from './work/work.component';
import { AddressComponent } from './address/address.component';
import { ResultComponent } from './result/result.component';

/* Shared Service */
import { FormDataService } from './data/formData.service';
import { WorkflowService } from './workflow/workflow.service';
import { CommonModule } from "@angular/common";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AddPatientRoutingModule,
        FeatherModule
    ],
    providers: [
        { provide: FormDataService, useClass: FormDataService },
        { provide: WorkflowService, useClass: WorkflowService }
    ],
    declarations: [AddPatientComponent, NavbarComponent, PersonalComponent, WorkComponent, AddressComponent, ResultComponent],
    bootstrap: [AddPatientComponent]

})

export class AddPatientModule { }