import { Component, OnInit} from '@angular/core';

import { PatientService } from 'src/app/services/patients.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
    selector: 'app-recent-patients',
    templateUrl: './recent-patients.component.html',
    styleUrls: ['./recent-patients.component.scss']
})
export class RecentPatientsComponent implements OnInit {

    data: any;
    isLoading: boolean = false;

    constructor(private patientServ: PatientService,
                private fireService: FirebaseService) { }

    ngOnInit(): void {
        this.get_recent_patients();
        this.get_pic_profile();
    }

    get_recent_patients() {
        this.patientServ.get_recent_patients().subscribe(
            (response) => {
                this.data = response;
            }, (error) => {
                console.log(error);
            }
        );
    }

    get_pic_profile() {
        this.data.forEach(patient => {
        // Establecer la imagen de carga inicialmente
        patient.urlImg = 'assets/images/gif/loading.gif';  // Imagen de carga

        if (patient.urlImgFirebase !== 'NULL' && patient.urlImgFirebase !== '' && patient.urlImgFirebase !== null) {
            this.fireService.getProfileUrl(patient.idUsuario)
                .then(url => {
                    patient.urlImg = url;  // Actualizar con la imagen de Firebase
                })
                .catch(error => {
                    console.error('Error al obtener la URL del perfil:', error);
                    patient.urlImg = 'assets/images/users/user4.jpg';  // Imagen por defecto
                });
        } else {
            patient.urlImg = 'assets/images/users/user4.jpg';  // Imagen por defecto
        }
    });
    }

}
