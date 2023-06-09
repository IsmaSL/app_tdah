import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './error/not-found/not-found.component';

const Approutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: FullComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'patients',
        children: [
          {
            path: '',
            loadChildren: () => import('./patients/start/patients.module').then(m => m.PatientsModule)
          },
          {
            path: 'add-patient',
            loadChildren: () => import('./patients/add-patient/add-patient.module').then(m => m.AddPatientModule)
          },
          {
            path: 'patient-profile',
            loadChildren: () => import('./patients/patient-profile/patient-profile.module').then(m => m.PatientProfileModule)
          },
        ]
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/login',
    // component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
