import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prepare-test',
  templateUrl: './prepare-test.component.html',
  styleUrls: ['./prepare-test.component.scss']
})
export class PrepareTestComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.navigate(['/app/prepare-test/devices'], { skipLocationChange: true });
  }
}
