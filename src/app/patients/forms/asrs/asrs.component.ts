import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PatientService } from 'src/app/services/patients.service';
import { FormsTestService } from 'src/app/services/formsTests.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
    selector: 'app-asrs',
    templateUrl: './asrs.component.html',
    styleUrls: ['./asrs.component.scss']
})
export class AsrsComponent implements OnInit {

    id_current_patient: number;

    miFormulario = new FormGroup({
        q1: new FormControl('', Validators.required),
        q2: new FormControl('', Validators.required),
        q3: new FormControl('', Validators.required),
        q4: new FormControl('', Validators.required),
        q5: new FormControl('', Validators.required),
        q6: new FormControl('', Validators.required),
        q7: new FormControl('', Validators.required),
        q8: new FormControl('', Validators.required),
        q9: new FormControl('', Validators.required),
        q10: new FormControl('', Validators.required),
        q11: new FormControl('', Validators.required),
        q12: new FormControl('', Validators.required),
        q13: new FormControl('', Validators.required),
        q14: new FormControl('', Validators.required),
        q15: new FormControl('', Validators.required),
        q16: new FormControl('', Validators.required),
        q17: new FormControl('', Validators.required),
        q18: new FormControl('', Validators.required)
    });

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
        if (this.miFormulario.valid) {
            // Prepara formulario a enviar
            this.formToUpdate.idPaciente = this.id_current_patient;
            this.formToUpdate.form = 'asrs';
            this.formToUpdate.score = this.calcularTotal();
            
            console.log(this.formToUpdate);
            
            // Hace la solicitud
            this.formSer.update_score_form(this.formToUpdate).subscribe(
                (response) => {
                    this.swal.swalScoreFormUpdated(this.calcularTotal());
                    setInterval(() => {
                        this.router.navigate(['/app/patients/patient-profile/', this.id_current_patient]);
                    }, 3000);
                }, (error) => {
                    this.swal.swalScoreFormNotUpdated(error);
                }
            );
            console.log('Score: ' + this.calcularTotal());

        } else {
            this.swal.swalEmptyData();
            console.log('Formulario no válido, por favor responda todas las preguntas.');
            // Manejo de error o notificación al usuario
        }
    }

    calcularTotal(): number {
        let total = 0;
        Object.values(this.miFormulario.controls).forEach(control => {
            total += +control.value;
        });
        return total;
    }

}
