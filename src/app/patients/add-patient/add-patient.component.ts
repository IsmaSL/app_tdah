import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddPatientModel } from './add-patient.model';
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

    sustances: number;
    med: number;

    // Formulario del Paciente
    paciente: AddPatientModel = {
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
        },
        datos_clinicos: {
            add: 0,
            bipolar: 0,
            unipolar: 0,
            anxiety: 0,
            substance: 0,
            med: 0
        }
    }

    constructor(private swal: SwalService,
                private patientService: PatientService,
                private router: Router) { }

    ngOnInit(): void {
    }

    test() {
        this.paciente.datos_clinicos = {
            add: (this.cbx1 ? 1 : 0),
            bipolar: (this.cbx2 ? 1 : 0),
            unipolar: (this.cbx3 ? 1 : 0),
            anxiety: (this.cbx4 ? 1 : 0),
            substance: parseInt(this.sustances.toString()),
            med: parseInt(this.med.toString()),
        };

        console.log(this.paciente);
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
            this.paciente.datos_clinicos = {
                add: (this.cbx1 ? 1 : 0),
                bipolar: (this.cbx2 ? 1 : 0),
                unipolar: (this.cbx3 ? 1 : 0),
                anxiety: (this.cbx4 ? 1 : 0),
                substance: parseInt(this.sustances.toString()),
                med: parseInt(this.med.toString()),
            };
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
            },
            datos_clinicos: {
                add: 0,
                bipolar: 0,
                unipolar: 0,
                anxiety: 0,
                substance: 0,
                med: 0
            }
        };

        this.cbx1 = false;
        this.cbx2 = false;
        this.cbx3 = false;
        this.cbx4 = false;

        this.sustances = 0;
        this.med = 0;

        
        this.swal.swalCleanData();
    }

}
