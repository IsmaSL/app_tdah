import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { FeatherModule } from "angular-feather";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PrepareTestRoutingModule } from './prepare-test-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

import { PrepareTestComponent } from './prepare-test.component';
import { SelectTestComponent } from './select-test/select-test.component';
import { SelectDeviceComponent } from './select-device/select-device.component';
import { SyncDeviceComponent } from './sync-device/sync-device.component';
import { StartTestComponent } from './start-test/start-test.component';

/* Shared Service */
// import { FormDataService } from './data/formData.service';
import { WorkflowService } from './workflow/workflow.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrepareTestRoutingModule,
        FeatherModule,
        NgbModule
    ],
    providers: [
        { 
            provide: WorkflowService, 
            useClass: WorkflowService 
        }
    ],
    declarations: [
        PrepareTestComponent, 
        NavbarComponent,
        SelectTestComponent, 
        SelectDeviceComponent, 
        SyncDeviceComponent, 
        StartTestComponent,
    ],
    bootstrap: [PrepareTestComponent]
})
export class PrepareTestModule { }