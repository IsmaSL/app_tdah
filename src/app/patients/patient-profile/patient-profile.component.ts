import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from 'src/app/services/patients.service';
import { TestService } from 'src/app/services/tests.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
    selector: 'app-patient-profile',
    templateUrl: './patient-profile.component.html',
    styleUrls: ['./patient-profile.component.scss'],
    providers: [NgbModalConfig, NgbModal],
})
export class PatientProfileComponent implements OnInit {
    patientId: string;
    data: any[];
    tests: any[];
    lengthTest: number = 0;
    loading = false;
    profileUrl: string;
    // --
    prob: string;
    diaf: string;
    // Informacion para localStorage
    current_patient: any = {
        id: '',
        nombre: '',
        edad: '',
        num_pruebas_prev: ''
    }

    constructor(config: NgbModalConfig,
        private modalService: NgbModal,
        private patientService: PatientService,
        private testService: TestService,
        private firebaseService: FirebaseService,
        private route: ActivatedRoute) {
        config.backdrop = 'static';
        config.centered = true;
        config.animation = true;
        config.size = "sm"
    }

    ngOnInit(): void {
        this.patientId = this.route.snapshot.paramMap.get('id');

        this.load_pic_profile(this.patientId)
        this.load_patient_details(this.patientId);
        this.load_patient_tests(this.patientId);
    }

    open(content) {
        this.modalService.open(content);
    }

    load_patient_details(id: string) {
        this.loading = true;
        this.patientService.get_info_patient(id).subscribe(
            (response) => {
                this.data = response;
                this.loading = false;
                // console.log(this.data);
                this.current_patient = {
                    id: this.patientId,
                    nombre: response.nombre + ' ' + response.apellidoP + ' ' + response.apellidoM,
                    edad: this.calculateAge(response.datos_generales.fechaNacimiento)
                }
                // console.log(this.current_patient);
            }, (error) => {
                this.loading = false;
                alert("Error: " + error.error.message);
            }
        );
    }

    load_patient_tests(id: string) {
        this.testService.get_all_test_by_patient(id).subscribe(
            (response) => {
                this.tests = response;
                this.lengthTest = this.tests.length
            }, (error) => {
                console.log(error.error);
            }
        );
    }

    load_pic_profile(id: string) {
        this.firebaseService.getProfileUrl(id).then(url => {
            this.profileUrl = url;
        }).catch(error => {
            console.error('Error al obtener la URL del perfil:', error);
            this.profileUrl = 'assets/images/users/user4.jpg';
        });
    }

    calculateAge(birthdate: string): number {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
        return age;
    }

    async saveDataPatient() {
        this.current_patient.num_pruebas_prev = this.lengthTest;
        this.patientService.set_patient_info(this.current_patient);
    }
}