import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { FeatherModule } from "angular-feather";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TestsRoutingModule } from './tests-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

import { TestsComponent } from './tests.component';
import { SelectTestComponent } from './select-test/select-test.component';
import { SelectDeviceComponent } from './select-device/select-device.component';


/* Shared Service */
// import { FormDataService } from './data/formData.service';
import { WorkflowService } from './workflow/workflow.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TestsRoutingModule,
        FeatherModule,
        NgbModule
    ],
    providers: [
        { provide: WorkflowService, useClass: WorkflowService }
    ],
    declarations: [
        TestsComponent, 
        NavbarComponent,
        SelectTestComponent, 
        SelectDeviceComponent,
    ],
    bootstrap: [TestsComponent]
})

export class TestsModule { }