import { Component, OnInit } from '@angular/core';

import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-select-test',
  templateUrl: './select-test.component.html',
  styleUrls: ['./select-test.component.scss']
})

export class SelectTestComponent implements OnInit {
  title = 'Detalles del dispositivo';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workflowService: WorkflowService
  ) { }

  ngOnInit() { }

  //Save button event Starts
  save() {
    let firstState = this.workflowService.getFirstInvalidStep(STEPS.devices);
    this.router.navigate(['sync'], { relativeTo: this.route.parent, skipLocationChange: true });
  }
  //Save button event Ends

  //Cancel button event Starts
  cancel() {
    this.router.navigate(['devices'], { relativeTo: this.route.parent, skipLocationChange: true });
  }
}

