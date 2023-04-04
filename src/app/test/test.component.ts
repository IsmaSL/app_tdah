import { Component, AfterViewInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class TestComponent implements AfterViewInit {

  minutos = 12;
  segundos = 10;
  milisegundos = 0;
  temporizador: any;

  constructor(private router: Router,
              private route: ActivatedRoute, 
              config: NgbModalConfig, 
              private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
    config.animation = true;
    config.size = "sm"
  }

  // lineChart
  public lineChartDataRC: Array<any> = [
    { data: [72, 73, 78, 74, 74, 78, 80, 84, 81, 78, 76, 79] },
    // { data: [18, 58, 20, 69, 16, 27, 90], label: 'Series B' }
  ];
  public lineChartDataAF: Array<any> = [
    { data: [123, 124, 123, 122, 124, 122, 122, 124, 122, 123, 122, 124], label: 'Eje X' },
    { data: [112, 113, 111, 114, 115, 112, 111, 112, 113, 114, 112, 111], label: 'Eje Y' },
    { data: [105, 106, 105, 104, 104, 105, 106, 104, 103, 105, 105, 104], label: 'Eje Z' },
    // { data: [18, 58, 20, 69, 16, 27, 90], label: 'Series B' }
  ];
  public lineChartDataEEG: Array<any> = [
    { data: [57, 83, 49, 68, 91, 35, 76, 40, 65, 98, 77, 44], label: 'Gamma' },
    { data: [13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 32, 24], label: 'Beta' },
    { data: [8, 11, 9, 9, 10, 10, 9, 11, 10, 12, 9, 13], label: 'Alpha' },
    { data: [5, 4, 7, 8, 5, 6, 4, 7, 5, 8, 6, 4], label: 'Tetha' },
    { data: [1.1, 1.9, 2.3, 2.7, 3.0, 3.2, 3.5, 3.7, 3.9, 3.9, 4.0, 4.0], label: 'Delta' },
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
  public lineChartOptionsRC: any = {
    responsive: true,
    legend: false
  };
  public lineChartOptionsAF: any = {
    responsive: true,
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
  public lineChartColorsAF: Array<any> = [
    {
      // Verde
      backgroundColor: 'rgba(0, 0, 0,.0)',
      borderColor: '#00FFAE',
      pointBackgroundColor: '#00FFAE',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00FFAE'
    },
    {
      // Amarillo
      backgroundColor: 'rgba(0, 0, 0,.0)',
      borderColor: '#FFE400',
      pointBackgroundColor: '#FFE400',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#FFE400'
    },
    {
      // Azul
      backgroundColor: 'rgba(0, 0, 0,.0)',
      borderColor: '#00C9FF',
      pointBackgroundColor: '#00C9FF',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00C9FF'
    },
  ];
  public lineChartColorsEEG: Array<any> = [
    {
      // Azul fuerte
      backgroundColor: 'rgba(0, 0, 0,.0)',
      borderColor: '#00AEFF',
      pointBackgroundColor: '#00AEFF',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00AEFF'
    },
    {
      // Verde
      backgroundColor: 'rgba(0, 0, 0,.0)',
      borderColor: '#00FFAE',
      pointBackgroundColor: '#00FFAE',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00FFAE'
    },
    {
      // Amarillo
      backgroundColor: 'rgba(0, 0, 0,.0)',
      borderColor: '#FFDC00',
      pointBackgroundColor: '#FFDC00',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#FFDC00'
    },
    {
      // Morado
      backgroundColor: 'rgba(0, 0, 0,.0)',
      borderColor: '#8F00FF',
      pointBackgroundColor: '#8F00FF',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#8F00FF'
    },
    {
      // Naranja
      backgroundColor: 'rgba(0, 0, 0,.0)',
      borderColor: '#FF6400',
      pointBackgroundColor: '#FF6400',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#FF6400'
    },
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

  // public randomize(): void {
  // Only Change 3 values
  // const data = [
  //   Math.round(Math.random() * 100),
  //   59,
  //   80,
  //   Math.random() * 100,
  //   56,
  //   Math.random() * 100,
  //   40
  // ];

  // const clone = JSON.parse(JSON.stringify(this.barChartData));
  // clone[0].data = data;
  // this.barChartData = clone;
  /**
   * (My guess), for Angular to recognize the change in the dataset
   * it has to change the dataset variable directly,
   * so one way around it, is to clone the data, change it and then
   * assign it;
   */
  // }

  ngAfterViewInit() {
    this.temporizador = setInterval(() => {
      this.actualizarCronometro();
    }, 10);
  }

  actualizarCronometro() {
    this.milisegundos++;
    if (this.milisegundos === 100) {
      this.milisegundos = 0;
      this.segundos++;
    }
    if (this.segundos === 60) {
      this.segundos = 0;
      this.minutos++;
    }
  }

  open(content) {
    this.modalService.open(content);
  }

  open2(content) {
    this.modalService.open(content);
  }

  open3(content) {
    this.modalService.open(content);
  }

  open4(content) {
    this.modalService.open(content);
    setTimeout(() => {
      this.router.navigateByUrl('/app/patients/patient-profile', { skipLocationChange: false });
      this.modalService.dismissAll(content);
    }, 3000);
  }

  cancelTest(content) {
    this.modalService.dismissAll(content);
    this.router.navigateByUrl('/app/patients', { skipLocationChange: false });
  }
}
