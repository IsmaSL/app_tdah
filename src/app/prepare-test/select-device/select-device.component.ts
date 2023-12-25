import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PatientService } from 'src/app/services/patients.service';

@Component({
    selector: 'app-select-device',
    templateUrl: './select-device.component.html',
    styleUrls: ['./select-device.component.scss'],
})
export class SelectDeviceComponent implements OnInit {

    title = 'Por favor seleccione el dispositivo a usar';
    current_patient: any[];

    constructor(private router: Router,
        private route: ActivatedRoute,
        private patientService: PatientService) { }

    ngOnInit(): void { }

    save() {
        // this.router.navigateByUrl('/app/prepare-test/tests', { skipLocationChange: true });
        this.router.navigate(['start'], { relativeTo: this.route.parent, skipLocationChange: true });
    }

    cancel() {
        let current_data = this.patientService.get_patient_info();
        let id_current_patient = current_data.id;
        this.router.navigate(['/app/patients/patient-profile/', id_current_patient]);   
    }
}
