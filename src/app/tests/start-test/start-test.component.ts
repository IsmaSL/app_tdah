import { Component, OnInit } from '@angular/core';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})

export class StartTestComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
    config.animation = true;
    config.size = "sm"
  }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content);
  }
  //Cancel button event Starts
  cancel() {
    this.router.navigate(['tests'], { relativeTo: this.route.parent, skipLocationChange: true });
  }
}
