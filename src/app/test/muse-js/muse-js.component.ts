import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

/* Services */
import { PatientService } from 'src/app/services/patients.service';
import { TestService } from 'src/app/services/tests.service';
import { SwalService } from 'src/app/services/swal.service';

/* Muse JS */
import { MuseClient } from 'muse-js';
import { Subject } from 'rxjs';

/* Chart JS */
import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import StreamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

/* Head */
import { XYZ } from './../components/head-view/head-view.component';

import { MuseFormModel } from './muse-js.model';

/* Firebase */
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
    // fechaHoy: string = new Date().toLocaleDateString().replace(/\//g, '-');
    fechaHoy: string = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
    tiempo: string = '00:00:00';
    tHora: string = '00:00:00';

    /* Filter */
    LOW_CUTOFF = 1;
    HIGH_CUTOFF = 100;
    maxBufferSize = 15000 / 4;

    /* Record and Save CSV file*/
    private samplesMap: Map<number, number[]> = new Map();
    recording = false;
    samples: number[][] = [];
    tempTime: number = 0;
    tempSamples: number[] = new Array(4);

    /* Config Test */
    lookingDevice: boolean = false;
    startTesting: boolean = false; // false
    showTest: boolean = false;

    /* Error */
    error: string = "";

    readOnly: boolean = false;

    /* Current Data Patient */
    current_patient: any;

    /* Current Data Test */
    test_id: string = '';

    /* Formulario - 1 (Antes de terminar) */
    formPrev = {
        nivelActFisicaObservada: '',
        nivelAteObservada: '',
        observaciones: ''
    }

    /* Formulario - 2 (Prediagnóstico) */
    formPred = {
        prediagnostico: '',
        justificacion: ''
    }

    /* Formulario - 3 (Final) */
    formFinal: MuseFormModel;

    constructor(private cd: ChangeDetectorRef,
        private router: Router,
        private modalConfig: NgbModalConfig,
        private modalService: NgbModal,
        private storage: Storage,
        private patientService: PatientService,
        private testService: TestService,
        private swal: SwalService) {
        modalConfig.backdrop = 'static';
        modalConfig.keyboard = false;
        modalConfig.centered = true;
        modalConfig.animation = true;
        modalConfig.size = "md";
    }

    ngOnInit(): void {
        this.formFinal = new MuseFormModel();

        this.current_patient = this.patientService.get_patient_info();
        this.test_id = this.set_test_id(this.current_patient.nombre, this.current_patient.num_pruebas_prev);
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

    ngOnDestroy() {
        if(this.myChart) {
            this.myChart.destroy();
        }
    }

    cancel() {
        let current_data = this.patientService.get_patient_info();
        let id_current_patient = current_data.id;
        this.router.navigate(['/app/patients/patient-profile/', id_current_patient]);   
    }

    set_test_id(fullName: string, id_test: number): string {
        const iniciales = fullName.split(' ')
                                .map(word => word ? word[0] : '')
                                .join('')
                                .toUpperCase();
    
        const fechaActual = new Date().toLocaleDateString('es', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            }).replace(/\//g, '_');

        return `${iniciales}_${fechaActual}_${id_test + 1}`;
    }

    actualizarContenido(contenido: string) {
        this.formPrev.observaciones = contenido;
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
                    duration: 10000,
                    frameRate: 30,
                    delay: 0,
                },
            },
            y1: {
                position: 'left',
                stack: 'first',
                stackWeight: 5,
                offset: true,
                title: {
                    display: true,
                    text: 'TP9 (μV)',
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
                    text: 'AF7 (μV)',
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
                    text: 'AF8 (μV)',
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
                    text: 'TP10 (μV)',
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
            title: {
                display: true,
            },
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
            streaming: {
                frameRate: 10,   // chart is drawn 5 times every second
            },
            tooltip: {
                enabled: false
            }
        },
    };

    /* Methods Muse */

    async connectToDevice() {
        try {
            this.lookingDevice = true;

            // Establece el uso de PPG
            // this.muse.enablePpg = true;

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
        // try {
        //     console.log('EEG Stream: ON');
        //     this.muse.eegReadings.subscribe(
        //         (eeg) => {
        //             this.myChart.data?.datasets[eeg.electrode].data.push({
        //                 x: eeg.timestamp,
        //                 y: eeg.samples[0]
        //             });

        //             this.myChart.update('quiet');

        //             this.recordSamples(eeg.electrode, eeg.timestamp, eeg.samples[0]);
        //         }
        //     );
        // } catch (error) {
        //     console.log("Error on: 'getEEGData()' -> " + error);
        // }
        try {
            console.log('EEG Stream: ON');
    
            this.muse.eegReadings.subscribe((eeg) => {
                // Guardamos todos los samples en el arreglo
                this.recording = true;
                eeg.samples.forEach((sample, index) => {
                    const adjustedTimestamp = eeg.timestamp + (index * 4);  // Ajustamos en 4 ms por cada muestra

                    if (!this.samplesMap.has(adjustedTimestamp)) {
                        this.samplesMap.set(adjustedTimestamp, new Array(4).fill(null));  // Inicializamos un array vacío si no existe
                    }

                    const samplesForTimestamp = this.samplesMap.get(adjustedTimestamp);
                    samplesForTimestamp![eeg.electrode] = sample;

                    // Verificar si todos los electrodos han sido registrados para este timestamp
                    if (this.isFullyFilledArray(samplesForTimestamp!)) {
                        this.samples.push([adjustedTimestamp, ...samplesForTimestamp!]);
                        this.samplesMap.delete(adjustedTimestamp);  // Eliminamos la entrada del mapa para liberar memoria
                    }
                });
    
                // Actualizamos el gráfico solo con el primer sample de cada grupo
                const firstSample = eeg.samples[0];
                if (this.myChart.data?.datasets[eeg.electrode].data.length >= this.maxBufferSize) {
                    this.myChart.data?.datasets[eeg.electrode].data.shift();
                }
                this.myChart.data?.datasets[eeg.electrode].data.push({
                    x: eeg.timestamp,
                    y: firstSample
                });
    
                this.myChart.update();  // No es necesario 'quiet' si las animaciones están inhabilitadas
            });
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

    /* Controles STOP, PUASE, FINISH */
    openPause(content) {
        this.modalService.open(content);
        this.muse.pause();

        this.isPaused = !this.isPaused;

        this.myChart.options.scales['x'].realtime.pause = this.isPaused;
        // this.myChart.options.scales['x'].realtime.delay = this.isPaused ? 0 : 3000;
        this.myChart.update({ duration: 0 });

        this.pausarCronometro();

        console.log("Pausing test...");

    }

    openStop(content) {
        this.modalService.open(content);
    }

    cancelTest(content) {
        this.modalService.dismissAll(content);
        this.router.navigate(['/app/patients/patient-profile/', this.current_patient.id]);
    }

    openFinish(content) {
        if(this.formPrev.nivelActFisicaObservada === '' || this.formPrev.nivelAteObservada === '') {
            this.swal.swalEmptyData();
        } else {
            console.log(this.formPrev);
            
            this.modalService.open(content);
        }
    }

    // Guardando información...
    open5(content) {
        this.modalService.open(content);
        this.disconnect();
    }

    openSave(content) {
        if(this.formPred.prediagnostico === '' || this.formPred.justificacion === '') {
            this.swal.swalEmptyData();
        } else {
            this.saveAllData();

            this.testService.add_test(this.formFinal).subscribe(
                (response) => {
                    this.modalService.open(content);
                    console.log(response);
                    setTimeout(() => {
                        this.modalService.dismissAll(content);
                        this.router.navigate(['/app/patients/patient-profile/', this.current_patient.id]);
                        // this.router.navigateByUrl('/app/patients/patient-profile')
                        //     .then(() => {
                        //         window.location.reload();
                        //     });
                    }, 3000);
                    
                }, (error) => {
                    this.swal.swalTestNotSaved(error.error.detail);
                }
            );
        }
    }

    // Guardar Prueba

    // Guarda los datos en la BD
    saveAllData() {
        this.saveToCsv(this.samples);
        console.log("Save_all_Data();");
        this.formFinal = {
            // idPrueba: null,
            idPaciente: this.current_patient.id,
            idTipoDispositivo: 1,
            detalle_prueba: {
                nivelAtencion: this.formPrev.nivelAteObservada,
                nivelActividad: this.formPrev.nivelActFisicaObservada,
                observaciones: this.formPrev.observaciones,
                diagnosticoMedico: this.formPred.prediagnostico,
                justificacionMedico: this.formPred.justificacion,
                urlCsv: this.test_id + '.csv',
            },
            fecha_prueba: this.fechaHoy,
            hora_prueba: this.tHora,
            tiempo_prueba: this.tiempo,
            probabilidad: 0.0,
            diagnosticoFinal: '',
        }
        console.log(this.formFinal);
    }

    // Guarda los samples en un CSV
    saveToCsv(samples: number[][]) {
        const channelNames = ['TP9', 'AF7', 'AF8', 'TP10']
        // const a = document.createElement('a');
        const headers = ['time', ...channelNames].join(',');
        const csvData = headers + '\n' + samples.map(item => item.join(',')).join('\n');

        const file = new Blob([csvData], { type: 'text/csv' });

        // Sube el archivo al id del paciente
        this.uploadFile(this.current_patient.id, this.test_id, file);
    }

    // Sube el archivo
    uploadFile(userId: any, filename: string, file: Blob) {
        const filePath = `storage/files/test/user_${userId}/${filename}.csv`;
        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot);
            }, (error) => {
                // manejar cualquier error que ocurra durante la subida
                console.error(error);
            }, () => {
                // una vez que la subida ha sido completada con éxito
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('URL del archivo:', downloadURL);
                });
            }
        );
    }
}