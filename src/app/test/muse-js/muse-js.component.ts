import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

/* Muse JS */
import { MuseClient } from 'muse-js';
import { Subject, finalize } from 'rxjs';

/* Chart JS */
import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import StreamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

import { XYZ } from './../components/head-view/head-view.component';

import { MuseFormModel } from './muse-js.model';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

Chart.register(AnnotationPlugin);
Chart.register(StreamingPlugin);

@Component({
    selector: 'app-muse-js',
    templateUrl: './muse-js.component.html',
    styleUrls: ['./muse-js.component.scss']
})
export class MuseJsComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('myChart') chart!: ElementRef;
    @ViewChild('modalInit') modalInit!: ElementRef;

    /* ChartJS */
    myChart: any;
    ctx: any;
    isPaused: boolean = false;

    /* Muse var */
    muse = new MuseClient();
    dConn: boolean | null = false;
    dName: string | null = '---';
    dFirw: string | null = '---';
    dBatt: number | null = null;
    dTemp: number | null = null;
    dPIzq: number = 0;
    dPDer: number = 0;

    /* Head */
    accelerometer!: XYZ;
    destroy = new Subject<void>();

    /* Time and Crono */
    cronometroActivo = false;
    intervalo: any;
    segundos = 0;
    fechaHoy: string = new Date().toLocaleDateString('es-ES').replace(/\//g, '-');;
    tiempo: string = '00:00:00';
    tHora: string = '00:00:00';

    /* Record and Save CSV file*/
    recording = false;
    samples: number[][] = [];
    tempTime: number = 0;
    tempSamples: number[] = new Array(4);

    /* Config Test */
    lookingDevice: boolean = false;
    startTesting: boolean = false;
    showTest: boolean = false;

    /* Error */
    error: string = "";

    /* Form */
    museForm: MuseFormModel;
    selectForm: string;

    readOnly: boolean = false;

    constructor(private cd: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private modalConfig: NgbModalConfig,
        private modalService: NgbModal,
        private lss: LocalStorageService,
        private storage: Storage) {
        modalConfig.backdrop = 'static';
        modalConfig.keyboard = false;
        modalConfig.centered = true;
        modalConfig.animation = true;
        modalConfig.size = "md";
    }

    ngAfterViewInit(): void {
        const ctx = (this.chart.nativeElement as HTMLCanvasElement).getContext('2d')!;
        this.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: this.lineChartData
            },
            options: this.lineChartOptions
        });
    }

    ngOnInit(): void {
        this.museForm = new MuseFormModel();
    }

    ngOnDestroy() {
        this.destroy.next();
    }

    /* Obtener hora e iniciar cronómetro */
    obtenerHoraActual(): void {
        const ahora = new Date();
        const horas = ahora.getHours().toString().padStart(2, '0');
        const minutos = ahora.getMinutes().toString().padStart(2, '0');
        const segundos = ahora.getSeconds().toString().padStart(2, '0');
        this.tHora = `${horas}:${minutos}:${segundos}`;
    }

    iniciarCronometro() {
        if (!this.cronometroActivo) {
            this.cronometroActivo = true;
            this.intervalo = setInterval(() => {
                this.segundos++;
                this.actualizarTiempo();
            }, 1000);
        }
    }

    pausarCronometro() {
        this.cronometroActivo = false;
        clearInterval(this.intervalo);
    }

    detenerCronometro() {
        this.cronometroActivo = false;
        clearInterval(this.intervalo);
        this.segundos = 0;
        this.actualizarTiempo();
    }

    private actualizarTiempo() {
        const horas = Math.floor(this.segundos / 3600);
        const minutos = Math.floor((this.segundos % 3600) / 60);
        const segs = this.segundos % 60;

        this.tiempo = (horas < 10 ? '0' : '') + horas + ':' +
            (minutos < 10 ? '0' : '') + minutos + ':' +
            (segs < 10 ? '0' : '') + segs;
    }

    /* Methods Chart.js */

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

    public lineChartData: ChartDataset[] = [
        {
            type: 'line',
            label: 'TP9',
            yAxisID: 'y1',
            xAxisID: 'x',
            backgroundColor: this.color(this.chartColors.red, '0.5'),
            borderColor: this.chartColors.red,
            pointBackgroundColor: this.chartColors.red,
            borderWidth: 2,
            pointRadius: 0,
            stack: 'first',
            order: 1,
            cubicInterpolationMode: 'monotone',
            data: [],
        },
        {
            type: 'line',
            label: 'AF7',
            yAxisID: 'y2',
            xAxisID: 'x',
            backgroundColor: this.color(this.chartColors.blue, '0.5'),
            borderColor: this.chartColors.blue,
            pointBackgroundColor: this.chartColors.blue,
            borderWidth: 2,
            pointRadius: 0,
            stack: 'first',
            order: 2,
            cubicInterpolationMode: 'monotone',
            data: [],
        },
        {
            type: 'line',
            label: 'AF8',
            yAxisID: 'y3',
            xAxisID: 'x',
            backgroundColor: this.color(this.chartColors.green, '0.5'),
            borderColor: this.chartColors.green,
            pointBackgroundColor: this.chartColors.green,
            borderWidth: 2,
            pointRadius: 0,
            stack: 'first',
            order: 3,
            cubicInterpolationMode: 'monotone',
            data: [],
        },
        {
            type: 'line',
            label: 'TP10',
            yAxisID: 'y4',
            xAxisID: 'x',
            backgroundColor: this.color(this.chartColors.yellow, '0.5'),
            borderColor: this.chartColors.yellow,
            pointBackgroundColor: this.chartColors.yellow,
            borderWidth: 2,
            pointRadius: 0,
            stack: 'first',
            order: 4,
            cubicInterpolationMode: 'monotone',
            data: [],
        },
    ];

    public lineChartOptions: ChartOptions = {
        responsive: true,
        animation: false,
        scales: {
            x: {
                type: 'realtime',
                time: {
                    displayFormats: {
                        second: 'HH:mm:ss',
                        minute: 'HH:mm:ss',
                        hour: 'HH:mm:ss',
                    },
                    unit: 'second',
                },
                realtime: {
                    delay: 3000,
                    duration: 12500,
                    frameRate: 30,
                    pause: this.isPaused
                },
            },
            y1: {
                position: 'left',
                stack: 'first',
                stackWeight: 5,
                offset: true,
                title: {
                    display: true,
                    text: 'TP9',
                    color: this.chartColors.red,
                },
                grid: {
                    color: this.chartColors.red,
                    borderColor: this.chartColors.red,
                },
                ticks: {
                    color: this.chartColors.red,
                },
                min: -100,
                max: 100
            },
            y2: {
                position: 'left',
                stack: 'first',
                stackWeight: 5,
                offset: true,
                title: {
                    display: true,
                    text: 'AF7',
                    color: this.chartColors.blue,
                },
                grid: {
                    color: this.chartColors.blue,
                    borderColor: this.chartColors.blue,
                },
                ticks: {
                    color: this.chartColors.blue,
                },
                min: -100,
                max: 100
            },
            y3: {
                position: 'left',
                stack: 'first',
                stackWeight: 5,
                offset: true,
                title: {
                    display: true,
                    text: 'AF8',
                    color: this.chartColors.green,
                },
                grid: {
                    color: this.chartColors.green,
                    borderColor: this.chartColors.green,
                },
                ticks: {
                    color: this.chartColors.green,
                },
                min: -100,
                max: 100
            },
            y4: {
                position: 'left',
                stack: 'first',
                stackWeight: 5,
                offset: true,
                title: {
                    display: true,
                    text: 'TP10',
                    color: this.chartColors.yellow,
                },
                grid: {
                    color: this.chartColors.yellow,
                    borderColor: this.chartColors.yellow,
                },
                ticks: {
                    color: this.chartColors.yellow,
                },
                min: -100,
                max: 100
            },
        },
        plugins: {
            legend: {
                align: 'start',
                labels: {
                    usePointStyle: true,
                },
            },
        },
    };

    /* Methods Muse */

    async connectToDevice() {
        try {
            this.lookingDevice = true;

            // Establece el uso de PPG
            this.muse.enablePpg = true;

            // Conecta con el dispositivo
            await this.muse.connect();
            console.log('Conectando...');

            // Inicia el dispositivo
            await this.muse.start();
            console.log('Iniciando...');

            // Obtiene la información del dispositivo
            await this.muse.deviceInfo();

            // Llama al método que extrae la información
            await this.getInfoDevice();

            if (this.dConn) {
                this.lookingDevice = false;
                this.showTest = true;
                setTimeout(() => {
                    this.startTesting = true;
                    this.startTest();
                }, 4000);
            }
        } catch (err: any) {
            this.lookingDevice = false;
        }
    }

    async startTest() {
        try {
            console.log('Starting test...');
            this.recording = true;
            // Tiempo
            this.obtenerHoraActual();
            this.iniciarCronometro();

            // Obtiene la información EEG
            await this.getEEGData();

            // Obtiene la información ACC
            await this.getACCData();

            // Obtiene la información PPG
            // await this.getPPGData();
        } catch (error) {
            console.log("Error on: 'startTest()' -> " + error);
        }
    }

    async getInfoDevice() {
        try {
            console.log('Getting device data...');
            this.dConn = this.muse.connectionStatus.value;
            this.dName = this.muse.deviceName;
            this.dFirw = (await this.muse.deviceInfo()).fw;
            this.muse.telemetryData.subscribe(
                (data) => {
                    this.dBatt = data.batteryLevel;
                    this.dTemp = data.temperature;
                }
            );
        } catch (error) {
            console.log("Error on: 'getInforDevice()' -> " + error);
        }
    }

    async getEEGData() {
        try {
            console.log('EEG Stream: ON');
            this.muse.eegReadings.subscribe(
                (eeg) => {
                    this.myChart.data?.datasets[eeg.electrode].data.push({
                        x: eeg.timestamp,
                        y: eeg.samples[0]
                    });

                    this.myChart.update('quiet');

                    this.recordSamples(eeg.electrode, eeg.timestamp, eeg.samples[0]);
                    // Count blinks
                    // if (eeg.electrode === 1 && Math.max(...eeg.samples.map(Math.abs)) > 128) {
                    //     this.dPIzq++;
                    // }

                    // if (eeg.electrode === 2 && Math.max(...eeg.samples.map(Math.abs)) > 128) {
                    //     this.dPDer++;
                    // }
                }
            );
        } catch (error) {
            console.log("Error on: 'getEEGData()' -> " + error);
        }
    }

    async getACCData() {
        try {
            console.log('ACC Stream: ON');
            this.muse.accelerometerData.subscribe(
                (reading) => {
                    this.accelerometer = reading.samples[reading.samples.length - 1];
                }
            );
        } catch (error) {
            console.log("Error on: 'getACCData()' -> " + error);
        }
    }

    async getPPGData() {
        try {
            console.log('PPG Stream: ON');
            this.muse.ppgReadings.subscribe(
                (ppg) => {
                    console.log("C: " + ppg.ppgChannel + " | S: " + ppg.samples);
                }
            );
        } catch (error) {
            console.log("Error on: 'getPPGData()' -> " + error);
        }
    }

    disconnect() {
        this.muse.disconnect();
        this.dConn = false;
        console.log("Conexión terminada.");

        this.stopRecording();
    }

    async recordSamples(electrode: number, time: number, sample: number) {
        if (this.tempTime === 0) {
            this.tempTime = time
            this.tempSamples[electrode] = sample;
        } else if (this.tempTime !== 0 && this.tempTime === time) {
            this.tempSamples[electrode] = sample;

            if (this.isFullyFilledArray(this.tempSamples)) {
                this.samples.push([this.tempTime, ...this.tempSamples]);
                this.tempTime = 0;
                this.tempSamples = new Array(4);
            }
        } else {
            this.tempTime = time;
            this.tempSamples[electrode] = sample;
        }
    }

    isFullyFilledArray(arr: (number | null | undefined)[]): boolean {
        for (const element of arr) {
            if (element === null || element === undefined) {
                return false;
            }
        }
        return true;
    }

    stopRecording() {
        this.recording = false;
        console.log("Datos grabados.");
    }

    resumeTest() {
        this.muse.resume();

        this.isPaused = !this.isPaused;
        this.myChart.options.scales['x'].realtime.pause = this.isPaused
        this.myChart.update({ duration: 0 });


        console.log("Resuming test...");
    }

    get sampleCount() {
        return this.samples.length;
    }

    saveToCsv(samples: number[][]) {
        const channelNames = ['TP9', 'AF7', 'AF8', 'TP10']
        const a = document.createElement('a');
        const headers = ['time', ...channelNames].join(',');
        const csvData = headers + '\n' + samples.map(item => item.join(',')).join('\n');

        let filename = 'idPaciente_' + this.fechaHoy + '_' + this.tHora;
        let userId = 1;

        const file = new Blob([csvData], { type: 'text/csv' });
        this.uploadFile(userId, filename, file);
    }

    open(content) {
        this.modalService.open(content);
        this.muse.pause();

        this.isPaused = !this.isPaused;

        this.myChart.options.scales['x'].realtime.pause = this.isPaused;
        // this.myChart.options.scales['x'].realtime.delay = this.isPaused ? 0 : 3000;
        this.myChart.update({ duration: 0 });

        this.pausarCronometro();

        console.log("Pausing test...");

    }

    open2(content) {
        this.modalService.open(content);
    }

    open3(content) {
        this.modalService.open(content);
    }

    open4(content) {
        this.modalService.open(content);
        this.saveAllData();
        setTimeout(() => {
            this.modalService.dismissAll(content);
            this.router.navigateByUrl('/app/patients/patient-profile', { skipLocationChange: false })
                .then(() => {
                    window.location.reload();
                });
        }, 3000);
    }

    open5(content) {
        this.modalService.open(content);
        this.disconnect();
    }

    cancelTest(content) {
        this.modalService.dismissAll(content);
        this.router.navigateByUrl('/app/patients', { skipLocationChange: false });
    }

    onOptionChange(value: string) {
        this.selectForm = value;
    }

    saveAllData() {
        this.museForm = {
            idTest: 'BAMZ-001-12-03-2023',
            idPaciente: '0003',
            idDispositivo: '02',
            fecha: this.fechaHoy,
            horaInicio: this.tHora,
            duracionPrueba: this.tiempo,
            lpmPro: 60,
            lpmMax: 120,
            lpmMin: 60,
            nivelActividad: 'Alto',
            nivelConcentracion: 'Bajo',
            parpadeoPro: 40,
            parpadeoIzq: 20,
            parpadeoDer: 22,
            prediagnostico: this.selectForm,
        }


        const listaGuardada = this.lss.getItem("listTest");
        let datosLista = [];

        if (listaGuardada) {
            datosLista = JSON.parse(listaGuardada);
            datosLista.push(this.museForm);
            this.lss.setItem("listTest", JSON.stringify(datosLista));
        } else {
            this.error = "No se puede almacenar"
        }

        this.saveToCsv(this.samples);
        console.log("Save_all_Data();");

    }

    uploadFile(userId: any, filename: string, file: Blob) {
        const filePath = `storage/files/test/user_${userId}/${filename}.csv`;
        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot);
                
            },
            (error) => {
                // manejar cualquier error que ocurra durante la subida
                console.error(error);
            },
            () => {
                // una vez que la subida ha sido completada con éxito
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('URL del archivo:', downloadURL);
                });
            }
        );
    }
}
