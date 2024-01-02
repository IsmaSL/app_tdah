import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from 'src/app/services/patients.service';
import { TestService } from 'src/app/services/tests.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormsTestService } from 'src/app/services/formsTests.service';
import { SwalService } from 'src/app/services/swal.service';
import { MachineLearningService } from 'src/app/services/machine.service';

@Component({
    selector: 'app-patient-profile',
    templateUrl: './patient-profile.component.html',
    styleUrls: ['./patient-profile.component.scss'],
    providers: [NgbModalConfig, NgbModal],
})
export class PatientProfileComponent implements OnInit, AfterViewInit {
    patientId: string;
    data: any;
    forms: any;
    results: any;
    tests: any[];
    lengthTest: number = 0;
    loading = false;
    profileUrl: string;
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
        private formServ: FormsTestService,
        private route: ActivatedRoute,
        private swal: SwalService,
        private ml: MachineLearningService
    ) {
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
        this.load_patient_forms(parseInt(this.patientId));
    }

    ngAfterViewInit(): void { }

    open(content) {
        this.modalService.open(content);
    }

    load_patient_details(id: string) {
        this.loading = true;
        this.patientService.get_info_patient(id).subscribe(
            (response) => {
                this.data = response;
                this.loading = false;
                console.log(this.data);

                this.current_patient = {
                    id: this.patientId,
                    nombre: response.nombre + ' ' + response.apellidoP + ' ' + response.apellidoM,
                    edad: this.calculateAge(response.datos_generales.fechaNacimiento)
                }
                // console.log(this.current_patient);
                this.results = {
                    prob: response.datos_clinicos === null ? null:response.datos_clinicos.prob,
                    adhd: response.datos_clinicos === null ? null:response.datos_clinicos.adhd,
                }
                console.log(this.results);
                
            }, (error) => {
                this.loading = false;
                // alert("Error: " + error.error.message);
            }
        );
    }

    load_patient_tests(id: string) {
        this.testService.get_all_test_by_patient(id).subscribe(
            (response) => {
                this.tests = response;
                this.lengthTest = this.tests.length
                // console.log(this.tests);
                
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

    load_patient_forms(id: number) {
        this.formServ.get_score_forms(id).subscribe(
            (response) => {
                this.forms = response;
                console.log(response);
            }, (error) => {
                if(error.status === 404) {
                    this.forms = {
                        asrs: null,
                        wurs: null,
                        mdq: null,
                        ct: null,
                        madrs: null,
                        hads_a: null,
                        hads_d: null
                    }
                } else {
                    console.log(error);
                }
            }
        );
    }

    get_predict_diag() {
        const edad = this.calculateAge(this.data.datos_generales.fechaNacimiento);
        const grupoEdad = edad <= 29 ? 1 :
                          edad <= 39 ? 2 :
                          edad <= 49 ? 3 : 4;
        const data = {
            "SEX": this.data.datos_generales.sexo === 'F' ? 0 : 1,
            "AGE": grupoEdad,
            "ADD": this.data.datos_clinicos.add,
            "BIPOLAR": this.data.datos_clinicos.bipolar,
            "UNIPOLAR": this.data.datos_clinicos.unipolar,
            "ANXIETY": this.data.datos_clinicos.anxiety,
            "SUBSTANCE": this.data.datos_clinicos.substance,
            "CT": this.forms.ct === null ? 0 : this.forms.ct,
            "MDQ_POS": this.forms.mdq === null ? 0 : this.forms.mdq,
            "WURS": this.forms.wurs === null ? 0 : this.forms.wurs,
            "ASRS": this.forms.asrs === null ? 0 : this.forms.asrs,
            "MADRS": this.forms.madrs === null ? 0 : this.forms.madrs,
            "HADS_A": this.forms.hads_a === null ? 0 : this.forms.hads_a,
            "HADS_D": this.forms.hads_d === null ? 0 : this.forms.hads_d,
            "MED": this.data.datos_clinicos.med
        };

        this.ml.get_predict_diagnosis(data).subscribe(
            (response) => {
                const prediction = response.prediction;
                const dataResults = {
                    idPaciente: parseInt(this.patientId),
                    prediccionML: prediction
                }
                this.patientService.get_patient_results(dataResults).subscribe(
                    (response) => {
                        this.swal.swalPredictSuccess();
                        this.load_patient_details(this.patientId);
                        // console.log(response);
                    }, (error) => {
                        console.log(error);
                    }
                );
            }, (error) => {
                console.log('Error: ' + error);
            }
        );
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