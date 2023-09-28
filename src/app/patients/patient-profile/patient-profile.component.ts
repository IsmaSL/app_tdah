import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-patient-profile',
    templateUrl: './patient-profile.component.html',
    styleUrls: ['./patient-profile.component.scss'],
    providers: [NgbModalConfig, NgbModal],
})
export class PatientProfileComponent {
    active: number;
    subtitle: string;
    existList: boolean;
    isEmptyList: boolean;
    data: any[];

    constructor(config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.centered = true;
        config.animation = true;
        config.size = "sm"

        this.existList = localStorage.getItem('listTest') ? true : false;

        if(this.existList) {
            this.isEmptyList = JSON.parse(localStorage.getItem('listTest')).length <= 0 ? true : false;
            if(this.isEmptyList) {
                this.active = 2;
            } else {
                this.active = 1;
            }
        }
    }

    open(content) {
        this.modalService.open(content);
    }

}