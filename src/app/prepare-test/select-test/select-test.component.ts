import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() { }

  //Save button event Starts
  save() {
    this.router.navigate(['start'], { relativeTo: this.route.parent, skipLocationChange: true });
  }
  //Save button event Ends

  //Cancel button event Starts
  cancel() {
    this.router.navigate(['devices'], { relativeTo: this.route.parent, skipLocationChange: true });
  }
}

