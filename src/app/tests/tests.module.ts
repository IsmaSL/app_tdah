import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { TestsComponent } from './tests.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
    ],
    declarations: [TestsComponent],
    bootstrap: [TestsComponent]
})

export class TestsModule { }