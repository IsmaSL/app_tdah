import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login.component';
import { NotFoundComponent } from './error/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const Approutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'app',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'patients',
                canActivate: [AuthGuard],
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
                        children: [
                            {
                                path: ':id',
                                loadChildren: () => import('./patients/patient-profile/patient-profile.module').then(m => m.PatientProfileModule),
                            },
                            {
                                path: 'reports/:id',
                                loadChildren: () => import('./patients/reports/reports.module').then(m => m.ReportsModule)
                            }
                        ]
                    },
                    {
                        path: 'forms',
                        loadChildren: () => import('./patients/forms/forms.module').then(m => m.FormsTestModule)
                    }
                ]
            },
            {
                path: 'devices',
                canActivate: [AuthGuard],
                loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule)
            },
            {
                path: 'prepare-test',
                canActivate: [AuthGuard],
                loadChildren: () => import('./prepare-test/prepare-test.module').then(m => m.PrepareTestModule)
            },
            {
                path: 'test',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'muse-js',
                        loadChildren: () => import('./test/muse-js/muse-js.module').then(m => m.MuseJsModule)
                    }
                ],
            },
            {
                path: '**',
                component: NotFoundComponent,
                data: {
                    title: 'ERROR 404',
                    urls: [
                        { title: 'Ir al Inicio' },
                    ]
                }
            }
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
