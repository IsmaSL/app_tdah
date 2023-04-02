import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.router.navigate(['/app/tests/devices'], { skipLocationChange: true });
    this.router.navigate(['/app/tests/start'], { skipLocationChange: true });
  }

}
