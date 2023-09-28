import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MuseFormModel } from './muse-js.model';

import { Chart } from 'chart.js';
import * as moment from 'moment'
import * as d3 from "d3";
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    providers: [NgbModalConfig, NgbModal],
})
export class ReportsComponent implements OnInit, AfterViewInit {
    @ViewChild('hiddenDiv') hiddenDiv!: ElementRef;

    /* Chart */
    @ViewChild('chartCanvas') chartCanvas!: ElementRef;

    chart: any;
    csvData: any[] = [];
    timeData: string[] = [];
    valueData1: number[] = [];
    valueData2: number[] = [];
    valueData3: number[] = [];
    valueData4: number[] = [];

    /* Show chart */
    isShow: boolean = false;

    /* Data */
    reportId: number = 0;
    readOnly: boolean = true;
    arregloSeleccionado: MuseFormModel;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        const storedArreglos = localStorage.getItem('listTest');
        const arreglos = JSON.parse(storedArreglos);

        this.route.paramMap.subscribe((params) => {
            this.reportId = parseInt(params.get('id'), 10);
        });

        this.arregloSeleccionado = arreglos[this.reportId - 1]
    }

    ngAfterViewInit(): void {
        this.loadCSVData();
    }

    showDivAndScroll() {
        this.isShow = true;

        setTimeout(() => {
            this.scrollIntoView();
        }, 0);
    }

    private scrollIntoView() {
        this.hiddenDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    private chartColors: any = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)',
    };

    private color(def: string, alpha: string): string {
        return def.replace(')', ', ' + alpha + ')');
    };

    loadCSVData() {
        d3.csv('/assets/files/data.csv').then((data) => {
            this.csvData = data;
            this.processCSVData();
        });
    }

    processCSVData() {
        for (const entry of this.csvData) {
            const formattedTime = moment.unix(entry.time / 1000).format('HH:mm:ss');
            this.timeData.push(formattedTime);
            this.valueData1.push(parseFloat(entry.TP9));
            this.valueData2.push(parseFloat(entry.AF7));
            this.valueData3.push(parseFloat(entry.AF8));
            this.valueData4.push(parseFloat(entry.TP10));
        }

        this.createChart();
    }

    createChart() {
        const ctx = this.chartCanvas.nativeElement.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.timeData,
                datasets: [
                    {
                        label: 'TP9',
                        data: this.valueData1,
                        borderColor: this.chartColors.red,
                        pointBackgroundColor: this.chartColors.red,
                        backgroundColor: this.color(this.chartColors.red, '0.5'),
                        fill: false,
                        pointRadius: 0.5,
                        pointHitRadius: 1,
                        cubicInterpolationMode: 'monotone',
                        borderWidth: 1.5,
                    },
                    {
                        label: 'AF7',
                        data: this.valueData2,
                        borderColor: this.chartColors.blue,
                        pointBackgroundColor: this.chartColors.blue,
                        backgroundColor: this.color(this.chartColors.blue, '0.5'),
                        fill: false,
                        pointRadius: 0.5,
                        pointHitRadius: 1,
                        cubicInterpolationMode: 'monotone',
                        borderWidth: 1.5,
                    },
                    {
                        label: 'AF8',
                        data: this.valueData3,
                        borderColor: this.chartColors.green,
                        pointBackgroundColor: this.chartColors.green,
                        backgroundColor: this.color(this.chartColors.green, '0.5'),
                        fill: false,
                        pointRadius: 0.5,
                        pointHitRadius: 1,
                        cubicInterpolationMode: 'monotone',
                        borderWidth: 1.5,
                    },
                    {
                        label: 'TP10',
                        data: this.valueData4,
                        borderColor: this.chartColors.yellow,
                        pointBackgroundColor: this.chartColors.yellow,
                        backgroundColor: this.color(this.chartColors.yellow, '0.5'),
                        fill: false,
                        pointRadius: 0.5,
                        pointHitRadius: 1,
                        cubicInterpolationMode: 'monotone',
                        borderWidth: 1.5,
                    }
                ]
            },
            options: {
                transitions: {
                    zoom: {
                      animation: {
                        duration: 0
                      }
                    }
                },
                scales: {
                    y: {
                        min: -200,
                        max: 200
                    },
                },
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            drag: {
                                enabled: true,
                            },
                            mode: 'x',
                            scaleMode: 'x'
                        }
                    },
                    legend: {
                        align: 'start',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                }
            }
        });
    }
}
