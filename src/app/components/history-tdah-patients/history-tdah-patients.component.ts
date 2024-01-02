import { Component, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Chart, registerables, ChartDataset, ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-history-tdah-patients',
    templateUrl: './history-tdah-patients.component.html',
    styleUrls: ['./history-tdah-patients.component.scss']
})
export class HistoryTdahPatientsComponent implements OnInit, OnDestroy {

    @ViewChild('canvas') canvas: ElementRef;

    chart: Chart;
    data: any;
    fechaActual = new Date();
    date: any = {
        year: this.fechaActual.getFullYear(),
        month: this.fechaActual.getMonth() + 1,
    }

    constructor(private userSev: UsersService) { }

    ngOnInit(): void {
        this.get_data_history();
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    get_data_history() {
        this.userSev.get_history_data(this.date.year, this.date.month).subscribe(
            (response) => {
                this.data = response;
                this.crearGrafico();
            }, (error) => {
                console.log(error);
            }
        );
    }

    public chartColors: any = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)',
    };

    tiposDiagnostico = [
        { label: 'Sin TDAH', color: this.chartColors.green },
        { label: 'TDAH Inatento', color: this.chartColors.blue },
        { label: 'TDAH Hiperactivo', color: this.chartColors.orange },
        { label: 'TDAH Mixto', color: this.chartColors.red }
    ];

    crearGrafico(): void {
        if (!this.data || !this.canvas) {
            console.log('Datos aún no están disponibles.');
            return;
        }

        Chart.register(...registerables);

        // Transforma los datos en un formato que Chart.js pueda entender
        const labels: string[] = Object.keys(this.data).map(key => key.replace(/_/g, ' ')); // ["Sin TDAH", "TDAH Inatento", "TDAH Hiperactivo", "TDAH Mixto"]
        const data: number[] = Object.values(this.data); // [1, 0, 0, 1]
        const backgroundColors: string[] = this.tiposDiagnostico.map(tipo => tipo.color); // Colores según el tipo de diagnóstico

        // Un único dataset con todos los valores
        const datasets: ChartDataset[] = [{
            label: 'Cantidad de Pacientes',
            backgroundColor: backgroundColors, // Un color para cada barra
            data: data // Todos los valores en un único array
        }];

        // Configura y crea el gráfico
        this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                    },
                    y: {
                        beginAtZero: true,
                        max: this.maxRangoY(Math.max(...Object.values(data)))
                    }
                },
                plugins: {
                    legend: { display: false },
                    datalabels: {
                        color: '#000000',
                        anchor: 'end',
                        align: 'top',
                        formatter: (value, context) => {
                            return value;
                        },
                        font: {
                            size: 16,
                            weight: 'bolder'
                        }
                    }
                },
            }
        });
    }

    maxRangoY(value: number): number {
        if(value % 10 === 0) {
            return value + 10;
        }
        return Math.ceil(value / 10) * 10;
    }
}
