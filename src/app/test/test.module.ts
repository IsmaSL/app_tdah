import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Test',
        urls: [
          { title: 'Test', url: '' },
          { title: 'BAMZ-001-12-03-2023' }
        ]
      },
      component: TestComponent
    }
];

@NgModule({
    imports: [
      NgbModule,
      RouterModule.forChild(routes),
      ChartsModule,
    ],
    declarations: [
      TestComponent
    ]
  })
  export class TestModule { }
  