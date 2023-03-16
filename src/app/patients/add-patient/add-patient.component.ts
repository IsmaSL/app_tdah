import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.navigate(['/app/patients/add-patient/personal'], { skipLocationChange: true });
  }

}
