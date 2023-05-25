import { Component, AfterViewInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class PatientProfileComponent {
  active = 1;

  subtitle: string;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.centered = true;
    config.animation = true;
    config.size = "lg"
  }

  open(content) {
		this.modalService.open(content);
	}

}