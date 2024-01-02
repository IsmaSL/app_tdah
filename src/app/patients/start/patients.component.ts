import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from 'src/app/services/patients.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
    // selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss'],
    providers: [NgbModalConfig, NgbModal],
})
export class PatientsComponent implements OnInit {

    patientList: any[];
    loading = false;

    constructor(config: NgbModalConfig, 
                private modalService: NgbModal,
                private patientService: PatientService,
                private fireService: FirebaseService) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.centered = false;
        config.animation = true;
        config.size = "sm"
    }

    open(content) {
        this.modalService.open(content);
    }

    ngOnInit() {
        this.get_patients();
    }

    get_patients() {
        this.loading = true;
        this.patientService.get_all_patients().subscribe(
            (response) => {
                this.loading = false;
                this.patientList = response;   
                // console.log(this.patientList);
                this.get_pic_profile();
            }, (error) => {
                this.loading = false;
                // alert("Error: " + error.error.message);
            }
        );
    }

    get_pic_profile() {
        this.patientList.forEach(
            patient => {
                if(patient.urlImg !== 'NULL' || patient.urlImg !== '' || patient.urlImg !== null) {
                    this.fireService.getProfileUrl(patient.idUsuario).then(
                        url => {
                            patient.urlImg = url;
                        }
                    ).catch(
                        error => {
                            console.error('Error al obtener la URL del perfil:', error);
                            patient.urlImg = 'assets/images/users/user4.jpg';
                        }
                    );
                } else {
                    patient.urlImg = 'assets/images/users/user4.jpg';
                }
            }
        );
    }
}