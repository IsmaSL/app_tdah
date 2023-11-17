import { Component, ViewChild } from '@angular/core';

import { Chart, ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
// import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
    selector: 'app-history-tdah-tests',
    templateUrl: './history-tdah-tests.component.html',
    styleUrls: ['./history-tdah-tests.component.scss']
})
export class HistoryTdahTestsComponent {

    constructor() { }

    public lineChartDataAF: ChartDataset[] = [
        { data: [85], label: 'Déficit de Atención', cubicInterpolationMode: 'monotone', },
        // { data: [4, 2, 5, 2, 1, 3, 2, 5], label: 'Hiperactividad', cubicInterpolationMode: 'monotone', },
        // { data: [2, 5, 2, 6, 2, 5, 2, 4], label: 'Mixto', cubicInterpolationMode: 'monotone', },
    ];

    public lineChartLabels: Array<any> = [
        // 'Ene',
        // 'Feb',
        // 'Mar',
        // 'Arb',
        // 'May',
        // 'Jun',
        // 'Jul',
        // 'Ago',
        // 'Sep',
        'Oct',
        'Nov',
        'Dic'
    ];
    public lineChartOptionsAF: any = {
        plugins: {
            legend: { display: true },
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        scaleID: 'x',
                        value: 'March',
                        borderColor: 'orange',
                        borderWidth: 2,
                        label: {
                            display: true,
                            // position: 'left',
                            color: 'orange',
                            content: 'LineAnno',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                ],
            },
        },
    }

    public lineChartColorsAF: Array<any> = [
        {
            // Verde
            backgroundColor: 'rgba(12, 255, 0,.1)',
            borderColor: '#0CFF00',
            pointBackgroundColor: '#0CFF00',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#0CFF00',
        },
        {
            // Azul
            backgroundColor: 'rgba(0, 139, 255,.1)',
            borderColor: '#008BFF',
            pointBackgroundColor: '#008BFF',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#008BFF'
        },
        {
            // Naranja
            backgroundColor: 'rgba(255, 112, 0,.1)',
            borderColor: '#FF7000',
            pointBackgroundColor: '#FF7000',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#FF7000'
        },
    ];
    public lineChartLegend = true;
    public lineChartType = 'bar';
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }
    public chartHovered(e: any): void {
        // console.log(e);
    }
}

