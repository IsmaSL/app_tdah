import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { StatsComponent } from '../components/stats/stats.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inicio',
      urls: [
        { title: 'Inicio', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    },
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [
    HomeComponent,
    StatsComponent,
  ]
})
export class HomeModule { }
