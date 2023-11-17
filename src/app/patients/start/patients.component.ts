import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from 'src/app/services/patients.service';

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
                private patientService: PatientService) {
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
            }, (error) => {
                this.loading = false;
                alert("Error: " + error.error.message);
            }
        );
    }
}
