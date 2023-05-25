import { Component, AfterViewInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ReportsComponent implements AfterViewInit {
  active = 1;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
		config.keyboard = false;
    config.centered = true;
    config.animation = true;
    config.size = "lg"
  }

  open(content) {
    this.modalService.open(content)
  }

  public lineChartDataRC: Array<any> = [
    { data: [72, 73, 78, 74, 74, 78, 80, 84, 81, 78, 76, 79] },
    // { data: [18, 58, 20, 69, 16, 27, 90], label: 'Series B' }
  ];

  public lineChartOptionsRC: any = {
    responsive: true,
    legend: false
  };

  public lineChartColorsRC: Array<any> = [
    {
      // Rojo
      backgroundColor: 'rgba(255, 0, 0,.1)',
      borderColor: '#E50000',
      pointBackgroundColor: '#E50000',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#E50000'
    },
  ];

  public lineChartLabels: Array<any> = [
    '1\'',
    '2\'',
    '3\'',
    '4\'',
    '5\'',
    '6\'',
    '7\'',
    '8\'',
    '9\'',
    '10\'',
    '11\'',
    '12\''
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  ngAfterViewInit() {}

}
