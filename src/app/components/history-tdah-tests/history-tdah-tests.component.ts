import { Component, ViewChild } from '@angular/core';

import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexYAxis,
    ApexLegend,
    ApexXAxis,
    ApexTooltip,
    ApexTheme,
    ApexGrid,
    ApexFill
} from 'ng-apexcharts';

export type yearlyproductsalesChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: any;
    theme: ApexTheme;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    colors: string[];
    markers: any;
    grid: ApexGrid;
    fill: ApexFill;
};

@Component({
  selector: 'app-history-tdah-tests',
  templateUrl: './history-tdah-tests.component.html',
  styleUrls: ['./history-tdah-tests.component.scss']
})
export class HistoryTdahTestsComponent {

    @ViewChild("chart") chart: ChartComponent = Object.create(null);
    
    public yearlyproductsalesChartOptions: Partial<yearlyproductsalesChartOptions>;

    constructor() {
        this.yearlyproductsalesChartOptions = {
            series: [
                {
                    type: 'area',
                    name: 'Déficit de Atención',
                    data: [5, 2, 7, 4, 5, 3, 5, 4]
                },
                {
                    type: 'area',
                    name: 'Hiperactividad',
                    data: [2, 5, 2, 6, 2, 5, 2, 4]
                },
                {
                    type: 'area',
                    name: 'Ambos',
                    data: [4, 2, 5, 2, 1, 3, 2, 5]
                }
            ],
            chart: {
                fontFamily: 'Rubik,sans-serif',
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 4,
                strokeColors: 'transparent',
            },
            stroke: {
                curve: 'smooth',
                width: '2',
            },
            colors: ['#8898aa', '#2cabe3', '#ff7514'],
            legend: {
                show: false,
            },
            fill: {
                type: 'gradient',
                opacity: 1,
                gradient: {
                    shade: 'light',
                    type: "vertical",
                    shadeIntensity: 0.5,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 0.5,
                    opacityTo: 0.3,
                    stops: [0, 50, 100]
                }
            },
            grid: {
                show: true,
                strokeDashArray: 3,
                borderColor: 'rgba(0,0,0,0.1)',
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            xaxis: {
                type: 'category',
                categories: [
                    '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'
                ],
                labels: {
                    style: {
                        colors: '#a1aab2'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#a1aab2'
                    }
                }
            },
            tooltip: {
                theme: 'dark'
            }
        };
    }
}

