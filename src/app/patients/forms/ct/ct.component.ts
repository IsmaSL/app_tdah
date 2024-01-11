import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PatientService } from 'src/app/services/patients.service';
import { FormsTestService } from 'src/app/services/formsTests.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-ct',
  templateUrl: './ct.component.html',
  styleUrls: ['./ct.component.scss']
})
export class CtComponent implements OnInit {

    id_current_patient: number;
    miFormulario = new FormGroup ({});
    formToUpdate: any = {
        idPaciente: 0,
        form: '',
        score: 0
    }

    constructor(private router: Router, 
        private patSer: PatientService,
        private formSer: FormsTestService,
        private swal: SwalService) { }

    ngOnInit(): void {
        let current_data = this.patSer.get_patient_info();
        this.id_current_patient = parseInt(current_data.id);
    }

    cancel() {
        this.router.navigate(['/app/patients/patient-profile/', this.id_current_patient]);   
    }

    clean() {
        this.miFormulario.reset();
    }

    onSubmit() {
        
    }

}
