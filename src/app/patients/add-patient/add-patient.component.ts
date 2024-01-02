import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/services/swal.service';
import { PatientService } from 'src/app/services/patients.service';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

    // Fecha de hoy
    fecha = new Date();
    anio = this.fecha.getFullYear();
    mes = String(this.fecha.getMonth() + 1).padStart(2, '0'); // Enero es 0
    dia = String(this.fecha.getDate()).padStart(2, '0');
    fechaHoy = `${this.anio}-${this.mes}-${this.dia}`;

    cbx1: boolean = false;
    cbx2: boolean = false;
    cbx3: boolean = false;
    cbx4: boolean = false;

    sustances: number = 0;
    med: number = 0;

    // Formulario del Paciente
    paciente = {
        urlImg: 'NULL',
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        rol: 'Paciente',
        correo: '',
        contraseña: 'nosetpassword',
        fechaRegistro: this.fechaHoy,
        estado: '1',
        datos_generales: {
            fechaNacimiento: '',
            sexo: '',
            ciudadResidencia: '',
            numTelefono: '',
            numTelefonoFam: '',
            ocupacion: ''
        }
    }

    constructor(private swal: SwalService,
                private patientService: PatientService,
                private router: Router) { }

    ngOnInit(): void {
    }

    test() {
        console.log('add: ' + (this.cbx1 ? 1 : 0));
        console.log('tb: ' + (this.cbx2 ? 1 : 0));
        console.log('tu: ' + (this.cbx3 ? 1 : 0));
        console.log('ta: ' + (this.cbx4 ? 1 : 0));
        console.log('sus: ' + this.sustances);
        console.log('med: ' + this.med);
    }

    sonTodosLosCamposLlenos(): boolean {
        // Validar campos de primer nivel
        for (const key in this.paciente) {
            if (this.paciente[key] === '' || this.paciente[key] == null) {
                return false;
            }
            // Si la propiedad es un objeto, validar sus campos
            if (typeof this.paciente[key] === 'object') {
                for (const innerKey in this.paciente[key]) {
                    if (this.paciente[key][innerKey] === '' || this.paciente[key][innerKey] == null) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    savePatient() {
        if(this.sonTodosLosCamposLlenos()) {
            this.patientService.add_patient(this.paciente).subscribe(
                (response) => {
                    console.log(response);
                    this.swal.swalPatientSaved();
                    setTimeout(() => {
                        this.router.navigate(['/app/patients']);
                    }, 3000);
                }, (error) => {
                    this.swal.swalPatientNotSaved(error.error.message);
                    console.log(error.error.message);
                }
            );
        } else {
            this.swal.swalEmptyData();
        }
    }

    cleanForm() {
        this.paciente = {
            urlImg: 'NULL',
            nombre: '',
            apellidoP: '',
            apellidoM: '',
            rol: 'Paciente',
            correo: '',
            contraseña: 'nosetpassword',
            fechaRegistro: this.fechaHoy,
            estado: '1',
            datos_generales: {
                fechaNacimiento: '',
                sexo: '',
                ciudadResidencia: '',
                numTelefono: '',
                numTelefonoFam: '',
                ocupacion: ''
            }
        }
        this.swal.swalCleanData();
    }

}
