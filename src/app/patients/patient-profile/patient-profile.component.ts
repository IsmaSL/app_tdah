import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patients.service';

@Component({
    selector: 'app-patient-profile',
    templateUrl: './patient-profile.component.html',
    styleUrls: ['./patient-profile.component.scss'],
    providers: [NgbModalConfig, NgbModal],
})
export class PatientProfileComponent implements OnInit{
    patientId: string;

    active: number;
    subtitle: string;
    existList: boolean;
    isEmptyList: boolean;
    data: any[];

    constructor(config: NgbModalConfig, 
                private modalService: NgbModal,
                private patientService: PatientService,
                private route: ActivatedRoute) {
        config.backdrop = 'static';
        config.centered = true;
        config.animation = true;
        config.size = "sm"

        this.existList = localStorage.getItem('listTest') ? true : false;

        // if(this.existList) {
        //     this.isEmptyList = JSON.parse(localStorage.getItem('listTest')).length <= 0 ? true : false;
        //     if(this.isEmptyList) {
        //         this.active = 2;
        //     } else {
        //         this.active = 1;
        //     }
        // }
    }
    ngOnInit(): void {
        this.patientId = this.route.snapshot.paramMap.get('id');
        this.load_patient_details(this.patientId);
    }

    open(content) {
        this.modalService.open(content);
    }

    load_patient_details(id: string) {
        this.patientService.get_info_patient(id).subscribe(
            (response) => {
                console.log(response);
            }, (error) => {
                alert("Error: " + error.error.message);
            }
        );
    }

}