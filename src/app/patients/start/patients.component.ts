import { Component, AfterViewInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class PatientsComponent implements AfterViewInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
		config.backdrop = 'static';
		config.keyboard = false;
    config.centered = false;
    config.animation = true;
    config.size = "sm"
	}

  open(content) {
		this.modalService.open(content);
	}

  ngAfterViewInit() { }
}
