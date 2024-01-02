import { Component, Input, ViewChild, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

@Component({
    selector: 'app-history-tdah-tests',
    templateUrl: './history-tdah-tests.component.html',
    styleUrls: ['./history-tdah-tests.component.scss']
})
export class HistoryTdahTestsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('canvas') canvas: ElementRef;
    @Input() pruebas: any[];

    chart: Chart;

    constructor() { }

    ngOnInit(): void {
        console.log(this.pruebas);
    }

    ngAfterViewInit(): void {   
        this.crearGrafico();
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
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

    parsearYFormatearFecha(fecha) {
        const fechaComoDate = new Date(fecha);
        return fechaComoDate.toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }

    crearGrafico(): void {
        if (!this.pruebas || !this.canvas) {
            return;
        }

        Chart.register(...registerables);

        const labels = [...new Set(this.pruebas.map(prueba => this.parsearYFormatearFecha(prueba.fecha_prueba)))];
        // Crear un dataset por cada tipo de diagnóstico
        const datasets = this.tiposDiagnostico.map((tipo, index) => {
            const data = labels.map(label => {
                const prueba = this.pruebas.find(p => this.parsearYFormatearFecha(p.fecha_prueba) === label && Number(p.diagnosticoFinal) === index);
                return prueba ? prueba.probabilidad * 100 : 1;
            });
        
            return {
                label: tipo.label,
                backgroundColor: tipo.color,
                data: data
            };
        });

        this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                layout: {
                    padding: {
                        bottom: 0 // Establece el padding inferior a 0
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                    },
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: { display: true },
                    datalabels: {
                        color: '#000000', // Color del texto
                        anchor: 'end', // Alinea el texto en la parte superior de la barra
                        align: 'top', // Alinea el texto arriba
                        formatter: (value, context) => {
                            return value + '%'; // Agrega el signo de porcentaje
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

}

