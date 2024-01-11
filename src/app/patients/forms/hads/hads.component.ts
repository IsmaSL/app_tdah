import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PatientService } from 'src/app/services/patients.service';
import { FormsTestService } from 'src/app/services/formsTests.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-hads',
  templateUrl: './hads.component.html',
  styleUrls: ['./hads.component.scss']
})
export class HadsComponent implements OnInit {

    id_current_patient: number;
    hads = new FormGroup ({
        a1: new FormControl('', Validators.required),
        a2: new FormControl('', Validators.required),
        a3: new FormControl('', Validators.required),
        a4: new FormControl('', Validators.required),
        a5: new FormControl('', Validators.required),
        a6: new FormControl('', Validators.required),
        a7: new FormControl('', Validators.required),
        d1: new FormControl('', Validators.required),
        d2: new FormControl('', Validators.required),
        d3: new FormControl('', Validators.required),
        d4: new FormControl('', Validators.required),
        d5: new FormControl('', Validators.required),
        d6: new FormControl('', Validators.required),
        d7: new FormControl('', Validators.required),
    });
    formToUpdate: any = {
        idPaciente: 0,
        form: '',
        score: 0
    };
    turnForm: boolean = false;

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
        this.hads.reset();
    }

    nextForm() {
        this.turnForm = true;
    }

    onSubmit() {
        console.log("Puntos HADS-A: " + this.calcularTotal('a'));
        console.log("Puntos HADS-D: " + this.calcularTotal('d'));

        if (this.hads.valid) {
            // Prepara formulario a enviar
            this.formToUpdate.idPaciente = this.id_current_patient;
            this.formToUpdate.form = 'hads_a';
            this.formToUpdate.score = this.calcularTotal('a');
            
            // Hace la solicitud
            this.formSer.update_score_form(this.formToUpdate).subscribe(
                (response) => {
                    this.formToUpdate.idPaciente = this.id_current_patient;
                    this.formToUpdate.form = 'hads_d';
                    this.formToUpdate.score = this.calcularTotal('d');
                    
                    // Hace la solicitud
                    this.formSer.update_score_form(this.formToUpdate).subscribe(
                        (response) => {
                            this.swal.swalScoreFormUpdated(this.calcularTotal('a') + this.calcularTotal('d'));
                            setInterval(() => {
                                this.router.navigate(['/app/patients/patient-profile/', this.id_current_patient]);
                            }, 3000);
                        }, (error) => {
                            this.swal.swalScoreFormNotUpdated(error);
                        }
                    );
                }, (error) => {
                    this.swal.swalScoreFormNotUpdated(error);
                }
            );            
        } else {
            this.swal.swalEmptyData();
            console.log('Formulario no válido, por favor responda todas las preguntas.');
            // Manejo de error o notificación al usuario
        }
    }

    calcularTotal(q: string): number {
        let total = 0;
        for (let i = 1; i <= 7; i++) {
            const control = ( q === 'a' ? this.hads.get('a' + i) : this.hads.get('d' + i));
            if (control) {
                total += +control.value;
            }
        }
        return total;
    }

}
