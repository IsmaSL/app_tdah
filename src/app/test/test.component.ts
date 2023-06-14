import { Component, AfterViewInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";

import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import 'chartjs-adapter-luxon';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import StreamingPlugin from 'chartjs-plugin-streaming';
import { AnnotationPluginOptions } from 'chartjs-plugin-annotation/types/options';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);
Chart.register(StreamingPlugin);
Chart.register(AnnotationPlugin);

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

  //

  private now: Date = new Date();

  private chartColors: any = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  //private color: any = Chart.helpers.color;
  private color(def: string, alpha: string): string {
    return def.replace(')', ', ' + alpha + ')');
  }

  // Random data

  private onRefresh(chart: any) {
    var info: string = (new Date()).toLocaleTimeString();
    var label: string = '#';
    var time = Date.now();
    var data = {};
    chart.data.datasets.forEach((dataset: any) => {
      if (dataset.label.includes('Delta') || 
          dataset.label.includes('Tetha') || 
          dataset.label.includes('Alpha') || 
          dataset.label.includes('Beta') || 
          dataset.label.includes('Gamma') || 
          dataset.label.includes('signal')) {
        if (!label.includes(dataset.label)) {
          var value = Math.random() * (40.0 - 0.0) + 0.0;

          info += ' | ' + dataset.label + ' = ' + value.toFixed(2);
          data = {
            x: time,
            y: value
          };
        }
        dataset.data.push(data);
        label = dataset.label;
      }
    });
    chart.config.options.plugins.title.text = info;
  }

  private onRefreshHR(chart: any) {
    var info: string = (new Date()).toLocaleTimeString();
    var label: string = '#';
    var time = Date.now();
    var data = {};
    chart.data.datasets.forEach((dataset: any) => {
      if (dataset.label.includes('Ritmo Cardíaco')) {
        if (!label.includes(dataset.label)) {
          var value = Math.random() * (160 - 80) + 80;
          info += ' | ' + dataset.label + ' = ' + Math.trunc(value);
          data = {
            x: time,
            y: value
          };
        }
        dataset.data.push(data);
        label = dataset.label;
      }
    });
    chart.config.options.plugins.title.text = info;
  }

  private onRefreshAC(chart: any) {
    var info: string = (new Date()).toLocaleTimeString();
    var label: string = '#';
    var time = Date.now();
    var data = {};
    chart.data.datasets.forEach((dataset: any) => {
      if (dataset.label.includes('X') || dataset.label.includes('Y') || dataset.label.includes('Z')) {
        if (!label.includes(dataset.label)) {
          var value = Math.random() * (100 - (-100)) + (-100);
          info += ' | ' + dataset.label + ' = ' + Math.trunc(value);
          data = {
            x: time,
            y: value
          };
        }
        dataset.data.push(data);
        label = dataset.label;
      }
    });
    chart.config.options.plugins.title.text = info;
  }

  // Random data
  // AnnotatiosOptions

  public lineChartDataEEG: ChartDataset[] = [
    {
      type: 'line',
      label: 'Delta',
      yAxisID: 'y1',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.orange, '0.5'),
      borderColor: this.chartColors.orange,
      pointBackgroundColor: this.chartColors.orange,
      borderWidth: 3,
      pointRadius: 3,
      fill: false,
      stack: 'first',
      order: 1,
      // cubicInterpolationMode: 'monotone',
      data: []
    }, {
      type: 'line',
      label: 'Tetha',
      yAxisID: 'y2',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.purple, '0.5'),
      borderColor: this.chartColors.purple,
      pointBackgroundColor: this.chartColors.purple,
      borderWidth: 3,
      pointRadius: 3,
      fill: false,
      stack: 'first',
      order: 2,
      cubicInterpolationMode: 'monotone',
      data: []
    }, {
      type: 'line',
      label: 'Alpha',
      yAxisID: 'y3',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.yellow, '0.5'),
      borderColor: this.chartColors.yellow,
      pointBackgroundColor: this.chartColors.yellow,
      borderWidth: 3,
      pointRadius: 3,
      fill: false,
      stack: 'first',
      order: 3,
      cubicInterpolationMode: 'monotone',
      data: []
    }, {
      type: 'line',
      label: 'Beta',
      yAxisID: 'y4',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.red, '0.5'),
      borderColor: this.chartColors.red,
      pointBackgroundColor: this.chartColors.red,
      borderWidth: 3,
      pointRadius: 3,
      fill: false,
      stack: 'first',
      order: 4,
      cubicInterpolationMode: 'monotone',
      data: []
    }, {
      type: 'line',
      label: 'Gamma',
      yAxisID: 'y5',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.blue, '0.5'),
      borderColor: this.chartColors.blue,
      pointBackgroundColor: this.chartColors.blue,
      borderWidth: 3,
      pointRadius: 3,
      fill: false,
      stack: 'first',
      order: 5,
      cubicInterpolationMode: 'monotone',
      data: []
    }
  ];

  public lineChartDataHR: ChartDataset[] = [
    {
      type: 'line',
      label: 'Ritmo Cardíaco',
      yAxisID: 'y1',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.red, '0.5'),
      borderColor: this.chartColors.red,
      pointBackgroundColor: this.chartColors.red,
      borderWidth: 3,
      pointRadius: 3,
      fill: true,
      stack: 'first',
      order: 1,
      // cubicInterpolationMode: 'monotone',
      data: []
    }
  ];

  public lineChartDataAC: ChartDataset[] = [
    {
      type: 'line',
      label: 'X',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.orange, '0.5'),
      borderColor: this.chartColors.orange,
      pointBackgroundColor: this.chartColors.orange,
      borderWidth: 3,
      pointRadius: 3,
      fill: false,
      data: []
    }, {
      type: 'line',
      label: 'Y',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.purple, '0.5'),
      borderColor: this.chartColors.purple,
      pointBackgroundColor: this.chartColors.purple,
      borderWidth: 3,
      pointRadius: 3,
      fill: false,
      data: []
    }, {
      type: 'line',
      label: 'Z',
      xAxisID: 'x',
      backgroundColor: this.color(this.chartColors.green, '0.5'),
      borderColor: this.chartColors.green,
      pointBackgroundColor: this.chartColors.green,
      borderWidth: 3,
      pointRadius: 3,
      fill: false,
      data: []
    }
  ];

  // Datasets
  // AnnotatiosOptions

  private annotationPluginOptions: AnnotationPluginOptions = {
    annotations: {
      box1: {
        drawTime: 'beforeDatasetsDraw',
        type: 'box',
        yScaleID: 'y1',
        yMin: 0,
        yMax: 40,
        backgroundColor: this.color(this.chartColors.orange, '0.05'),
        borderColor: this.color(this.chartColors.orange, '0.05'),
        borderWidth: 1,
        click: function (contexte) {
          //console.log('Box', e.type, this);
        }
      },
      box2: {
        drawTime: 'beforeDatasetsDraw',
        type: 'box',
        yScaleID: 'y2',
        yMax: 40,
        backgroundColor: this.color(this.chartColors.purple, '0.05'),
        borderColor: this.color(this.chartColors.purple, '0.05'),
        borderWidth: 1,
        click: function (contexte) {
          //console.log('Box', e.type, this);
        }
      },
      box3: {
        drawTime: 'beforeDatasetsDraw',
        type: 'box',
        yScaleID: 'y3',
        yMax: 40,
        backgroundColor: this.color(this.chartColors.yellow, '0.05'),
        borderColor: this.color(this.chartColors.yellow, '0.05'),
        borderWidth: 1,
        click: function (contexte) {
          //console.log('Box', e.type, this);
        }
      },
      box4: {
        drawTime: 'beforeDatasetsDraw',
        type: 'box',
        yScaleID: 'y4',
        yMax: 40,
        backgroundColor: this.color(this.chartColors.red, '0.05'),
        borderColor: this.color(this.chartColors.red, '0.05'),
        borderWidth: 1,
        click: function (contexte) {
          //console.log('Box', e.type, this);
        }
      },
      box5: {
        drawTime: 'beforeDatasetsDraw',
        type: 'box',
        yScaleID: 'y5',
        yMax: 40,
        backgroundColor:  this.color(this.chartColors.blue, '0.05'),
        borderColor:  this.color(this.chartColors.blue, '0.05'),
        borderWidth: 1,
        click: function (contexte) {
          //console.log('Box', e.type, this);
        }
      },
    }
  };

  private annotationPluginOptionsHR: AnnotationPluginOptions = {
    annotations: {
      box1: {
        drawTime: 'beforeDatasetsDraw',
        type: 'box',
        yScaleID: 'y1',
        yMin: 70,
        yMax: 170,
        backgroundColor: this.color(this.chartColors.red, '0.05'),
        borderColor: this.color(this.chartColors.red, '0.05'),
        borderWidth: 1,
        click: function (contexte) {
          //console.log('Box', e.type, this);
        }
      }
    }
  };


  public lineChartOptions: ChartOptions = {
    responsive: true,
    // animation: false,
    scales: {
      x: {
        type: 'realtime',
        time: {
          displayFormats: {
            second: 'HH:mm:ss',
            minute: 'HH:mm:ss',
            hour: 'HH:mm:ss'
          },
          tooltipFormat: 'HH:mm:ss',
          unit: 'second',
        },
        realtime: {
          duration: 20000,
          ttl: 60000,
          refresh: 1000,
          delay: 2000,
          pause: false,
          onRefresh: chart => {
            this.onRefresh(chart);
          }
        }
      },
      x0: {
        type: 'time',
        time: {
          displayFormats: {
            second: 'HH:mm:ss',
            minute: 'HH:mm',
            hour: 'HH:mm'
          },
          tooltipFormat: 'HH:mm:ss',
          unit: 'minute',
        },
      },
      y1: {
        position: 'left',
        stack: 'first',
        stackWeight: 10,
        offset: true,
        title: {
          display: true,
          text: 'Delta',
          color: this.chartColors.orange,
        },
        grid: {
          drawOnChartArea: true,
          color: this.chartColors.orange,
          // borderColor: this.chartColors.red,
        },
        ticks: {
          color: this.chartColors.orange,
        }
      },
      y2: {
        position: 'left',
        stack: 'first',
        stackWeight: 10,
        offset: true,
        title: {
          display: true,
          text: 'Tetha',
          color: this.chartColors.purple,
        },
        grid: {
          drawOnChartArea: true,
          color: this.chartColors.purple,
          // borderColor: this.chartColors.blue,
        },
        ticks: {
          color: this.chartColors.purple,
        }
      },
      y3: {
        position: 'left',
        stack: 'first',
        stackWeight: 10,
        offset: true,
        title: {
          display: true,
          text: 'Alpha',
          color: this.chartColors.yellow,
        },
        grid: {
          drawOnChartArea: true,
          color: this.chartColors.yellow,
          // borderColor: this.chartColors.blue,
        },
        ticks: {
          color: this.chartColors.yellow,
        }
      },
      y4: {
        position: 'left',
        stack: 'first',
        stackWeight: 10,
        offset: true,
        title: {
          display: true,
          text: 'Beta',
          color: this.chartColors.red,
        },
        grid: {
          drawOnChartArea: true,
          color: this.chartColors.red,
          // borderColor: this.chartColors.blue,
        },
        ticks: {
          color: this.chartColors.red,
        }
      },
      y5: {
        position: 'left',
        stack: 'first',
        stackWeight: 10,
        offset: true,
        title: {
          display: true,
          text: 'Gamma',
          color: this.chartColors.blue,
        },
        grid: {
          drawOnChartArea: true,
          color: this.chartColors.blue,
          // borderColor: this.chartColors.blue,
        },
        ticks: {
          color: this.chartColors.blue,
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Interactions sample' 
      },
      legend: {
        //display: false,
        align: 'start',
        labels: {
          usePointStyle: true,
        }
      },
      annotation: this.annotationPluginOptions,
      // zoom: {
      //   zoom: {
      //     wheel: {
      //       enabled: true,
      //     },
      //     pinch: {
      //       enabled: true
      //     },
      //     mode: 'xy',
      //   }
      // }
      // streaming: {
      //   duration: 1000,
      // },
    },
  };

  public lineChartOptionsHR: ChartOptions = {
    responsive: true,
    // animation: false,
    scales: {
      x: {
        type: 'realtime',
        time: {
          displayFormats: {
            second: 'ss',
            
          },
          tooltipFormat: 'HH:mm:ss',
          unit: 'second',
        },
        realtime: {
          duration: 60000,
          ttl: 60000,
          refresh: 10000,
          delay: 500,
          pause: false,
          onRefresh: chart => {
            this.onRefreshHR(chart);
          }
        }
      },
      x0: {
        type: 'time',
        time: {
          displayFormats: {
            second: 'HH:mm:ss',
            minute: 'HH:mm',
            hour: 'HH:mm'
          },
          tooltipFormat: 'HH:mm:ss',
          unit: 'minute',
        },
      },
      y1: {
        position: 'left',
        stack: 'first',
        stackWeight:10,
        offset: true,
        title: {
          display: false
        },
        grid: {
          drawOnChartArea: true,
          color: this.chartColors.red,
        },
        ticks: {
          color: this.chartColors.red,
        }
      },
    },
    plugins: {
      title: {
        display: true,
      },
      annotation: this.annotationPluginOptionsHR,
    },
  };

  public lineChartOptionsAC: ChartOptions = {
    responsive: true,
    // animation: false,
    scales: {
      x: {
        type: 'realtime',
        time: {
          displayFormats: {
            second: 'HH:mm:ss',
            minute: 'HH:mm:ss',
            hour: 'HH:mm:ss'
          },
          tooltipFormat: 'HH:mm:ss',
          unit: 'second',
        },
        realtime: {
          duration: 20000,
          ttl: 60000,
          refresh: 1000,
          delay: 0,
          pause: false,
          onRefresh: chart => {
            this.onRefreshAC(chart);
          }
        }
      },
      x0: {
        type: 'time',
        time: {
          displayFormats: {
            second: 'HH:mm:ss',
            minute: 'HH:mm',
            hour: 'HH:mm'
          },
          tooltipFormat: 'HH:mm:ss',
          unit: 'minute',
        },
      },
      y: {
        grid: {
          color: function(context) {
            if (context.tick.value === 0) {
              return '#FF0000';
            }
            return '#C1C1C1';
          },
        },
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Interactions sample' 
      },
      legend: {
        //display: false,
        align: 'start',
        labels: {
          usePointStyle: true,
        }
      }
    },
  };

}
