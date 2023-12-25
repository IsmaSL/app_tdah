import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { FeatherModule } from "angular-feather";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PrepareTestRoutingModule } from './prepare-test-routing.module';

import { PrepareTestComponent } from './prepare-test.component';
import { SelectTestComponent } from './select-test/select-test.component';
import { SelectDeviceComponent } from './select-device/select-device.component';
import { StartTestComponent } from './start-test/start-test.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrepareTestRoutingModule,
        FeatherModule,
        NgbModule
    ],
    providers: [ ],
    declarations: [
        PrepareTestComponent, 
        SelectTestComponent, 
        SelectDeviceComponent, 
        StartTestComponent,
    ],
    bootstrap: [PrepareTestComponent]
})
export class PrepareTestModule { }