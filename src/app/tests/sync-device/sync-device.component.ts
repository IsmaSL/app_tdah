import { Component, OnInit } from '@angular/core';

import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-sync-device',
  templateUrl: './sync-device.component.html',
  styleUrls: ['./sync-device.component.scss']
})
export class SyncDeviceComponent implements OnInit {

  title = "Buscando y sincronizando dispositivo";
  public showDiv: boolean = true;
  public buttonDisabled: boolean = true;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private workflowService: WorkflowService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showDiv = false;
      this.buttonDisabled = false;
    }, 4000); 
  }

  save() {
    let firstState = this.workflowService.getFirstInvalidStep(STEPS.devices);
    this.router.navigate(['start'], { relativeTo: this.route.parent, skipLocationChange: true });
  }
  //Save button event Ends

  //Cancel button event Starts
  cancel() {
    this.router.navigate(['tests'], { relativeTo: this.route.parent, skipLocationChange: true });
  }

}
