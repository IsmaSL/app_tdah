import { Component, OnInit, ViewChild } from '@angular/core';

import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";

import { NgbCarouselConfig, NgbCarousel} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.scss'],
  providers: [NgbCarouselConfig]
})
export class SelectDeviceComponent implements OnInit {

  title = 'Por favor seleccione el dispositivo a usar';
  images = [
    'assets/images/devices/device_1.jpg',
    'assets/images/devices/device_2.jpg',
    'assets/images/devices/device_3.png',
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private workflowService: WorkflowService,
              config: NgbCarouselConfig) {
    config.keyboard = true;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    
  }

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel = Object.create(null);

  ngOnInit(): void { }

  save() {
    let firstState = this.workflowService.getFirstInvalidStep(STEPS.tests);
    if (firstState.length > 0) {
    };
    this.router.navigateByUrl('/app/tests/tests', { skipLocationChange: true });
  }
}
