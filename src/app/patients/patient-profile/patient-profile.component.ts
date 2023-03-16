import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent {
  active = 2;

  subtitle: string;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

}