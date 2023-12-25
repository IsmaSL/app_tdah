import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/tests.service';

import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-plugin-annotation';
Chart.register(zoomPlugin);

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    providers: [NgbModalConfig, NgbModal],
})
export class ReportsComponent implements OnInit, AfterViewInit {
    /* Chart */
    @ViewChild('chartBT') chartBT!: ElementRef;

    chart: any;
    timeData: string[] = [];
    statusAttention: string;

    /* Data */
    patientId: string;
    reportId: string;
    readOnly: boolean = true;

    data: any;
    resultEEG = {
        id_user: '',
        url_file: ''
    };
    isLoading: boolean = false;
    isLoadingChart: boolean = false;
    isHiddenChart: boolean = false;

    ban: boolean = false;

    prob: string;
    diaf: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private modalConfig: NgbModalConfig,
                private modalService: NgbModal,
                private testService: TestService) {
                    modalConfig.backdrop = 'static';
                    modalConfig.keyboard = false;
                    modalConfig.centered = true;
                    modalConfig.animation = true;
                    modalConfig.size = "md";
                }

    ngOnInit() {
        // if(localStorage.getItem('report')) {
        //     const reportJSON = localStorage.getItem('report');
        //     const report = reportJSON ? JSON.parse(reportJSON) : null;

        //     this.prob = report ? report.probabilidad : undefined;
        //     this.diaf = report ? report.diagnosticoFinal : undefined;
        // } else {
        //     const report = { probabilidad: '', diagnosticoFinal: '' };
        //     localStorage.setItem('report', JSON.stringify(report));
        // }
        
        this.route.paramMap.subscribe((params) => {
            this.reportId = params.get('id');
        });
        this.get_report_info(this.reportId);
    }   

    ngAfterViewInit(): void {
        
    }

    showChart() {
        this.isHiddenChart = true;
        // Obtiene los datos
        this.get_results_eeg(this.data.usuario.idUsuario.toString(), this.data.detalle_prueba.urlCsv);
        // Pinta la gráfica

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
    
    get_report_info(id: string) {
        this.isLoading = true;
        this.testService.get_test_report(id).subscribe(
            (response) => {
                this.isLoading = false;
                this.data = response;
                this.patientId = response.usuario.idUsuario;
                console.log(this.data);
                
            }, (error) => {
                this.isLoading = false;
                console.log(error.error);
            }
        );
    }

    get_results_eeg(id: string, urlFile: string) {
        this.isLoadingChart = true;
        this.testService.get_results_eeg(id, urlFile).subscribe(
            (response) => {
                this.isLoadingChart = false;
                console.log(response);
                this.timeData = Array.from({ length: response.beta_theta_ratio_af7.length }, (_, i) => `${i + 1} min`);
                    this.statusAttention = response.final_state
                    this.createChart();
                    this.putDataOnChart(
                        response.beta_theta_ratio_af7,
                        response.beta_theta_ratio_af8);      
            }, (error) => {
                this.isLoadingChart = false;
                console.log(error.error);
            }
        );
    }

    createChart() {
        const ctx = this.chartBT.nativeElement.getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.timeData,
                datasets: [
                    {
                        type: 'line',
                        label: 'AF7 - Beta/Theta',
                        yAxisID: 'y1',
                        xAxisID: 'x',
                        backgroundColor: this.color(this.chartColors.blue, '0.5'),
                        borderColor: this.chartColors.blue,
                        pointBackgroundColor: this.chartColors.blue,
                        borderWidth: 1,
                        pointRadius: 4,
                        cubicInterpolationMode: 'monotone',
                        data: [],
                    },
                    {
                        type: 'line',
                        label: 'AF8 - Beta/Theta',
                        yAxisID: 'y1',
                        xAxisID: 'x',
                        backgroundColor: this.color(this.chartColors.green, '0.5'),
                        borderColor: this.chartColors.green,
                        pointBackgroundColor: this.chartColors.green,
                        borderWidth: 1,
                        pointRadius: 4,
                        cubicInterpolationMode: 'monotone',
                        data: [],
                    },
                ]
            },
            options: {
                transitions: {
                    zoom: {
                        animation: {
                            duration: 30
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Time (minutes)'
                        },
                    },
                    y1: {
                        position: 'left',
                        offset: true,
                        title: {
                            display: true,
                            text: 'Ratio',
                            color: this.chartColors.gray,
                        },
                        grid: {
                            color: this.chartColors.gray,
                            borderColor: this.chartColors.gray,
                        },
                        ticks: {
                            color: this.chartColors.gray,
                        },
                        min: 0,
                        max: 3.0
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
                        align: 'center',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                    annotation: {
                        annotations: [
                            {
                                type: 'line',
                                scaleID: 'y1',
                                value: 1.2,
                                borderColor: 'green',
                                borderWidth: 1,
                                label: {
                                    display: true,
                                    content: 'Atento \u2191'
                                }
                            },
                            {
                                type: 'line',
                                scaleID: 'y1',
                                value: 0.8,
                                borderColor: 'red',
                                borderWidth: 1,
                                label: {
                                    display: true,
                                    content: 'Distraído \u2193'
                                }
                            }
                        ]
                    }
                }
            }
        });
    }

    putDataOnChart(ratio_bt_af7: any, ratio_bt_af8: any) {
        this.chart.data.labels = this.timeData;
        this.chart.data.datasets[0].data = ratio_bt_af7;
        this.chart.data.datasets[1].data = ratio_bt_af8;
        this.chart.update();
    }

    updated_results_report(id: string) {

        const report = { probabilidad: '23.30', diagnosticoFinal: '0' };
        localStorage.setItem('report', JSON.stringify(report));

        // this.testService.updated_results_report(id).subscribe(
        //     (response) => {
        //         console.log(response);   
        //         this.ban = true;
        //     }, (error) => {
        //         console.log(error.error);
                
        //     }
        // );
    }

    open4(content) {
        this.modalService.open(content);
        this.updated_results_report(this.reportId);
        // if(this.ban) {
            setTimeout(() => {
                this.modalService.dismissAll(content);
                this.router.navigateByUrl('/app/patients/patient-profile/'+ this.patientId, { skipLocationChange: false })
                    .then(() => {
                        window.location.reload();
                    });
            }, 2000);
        // }
    }


}
