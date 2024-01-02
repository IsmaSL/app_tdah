import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SwalService {

    constructor() {}

    swalEmptyData() {
        Swal.fire({
            // background: '#F8D7DA',
            // color: '#842029',
            icon: "error",
            title: "Ups...",
            text: "Faltan campos por llenar.",
            customClass: {
                popup: 'border border-danger border-3',
                title: 'my-0',
                htmlContainer: 'my-0',
                timerProgressBar: 'bg-danger'
            },
            toast: true,
            position: 'top-right',
            grow: 'row',
            padding: '1em',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalCleanData() {
        Swal.fire({
            // background: '#F8D7DA',
            // color: '#842029',
            icon: "success",
            title: "¡Hecho!",
            text: "Se ha borrado la información.",
            customClass: {
                popup: 'border border-success-subtle border-3',
                title: 'my-0',
                htmlContainer: 'my-0',
                timerProgressBar: 'bg-success bg-opacity-50'
            },
            toast: true,
            position: 'top-right',
            grow: 'row',
            padding: '1em',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalPatientSaved() {
        Swal.fire({
            icon: "success",
            title: "¡Hecho!",
            text: "Nuevo paciente agregado.",
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalPatientNotSaved(message_error: string) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Paciente no registrado.",
            html: message_error,
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
        });
    }

    swalTestSaved() {
        Swal.fire({
            icon: "success",
            title: "¡Hecho!",
            text: "Resultados guardados sitisfactoriamente.",
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalTestNotSaved(message_error: string) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Paciente no registrado.",
            html: message_error,
            allowOutsideClick: false,
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
        });
    }

    swalGettingPrev() {
        Swal.fire({
            icon: "warning",
            title: "Obteniendo diagnóstico final",
            text: "Espere por favor",
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    swalTestUpdated() {
        Swal.fire({
            icon: "success",
            title: "¡Hecho!",
            text: "Diagnóstico final generado con éxito",
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalNotNetwork() {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Se ha perdido la conexión a internet :(",
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
        });
    }

    swalScoreFormUpdated(score: number) {
        Swal.fire({
            icon: "success",
            title: "Puntaje obtenido: " + score + " pts.",
            text: "La información se guardó correctamente.",
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalScoreFormNotUpdated(error: string) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "No se pudo guardar la información",
            html: error,
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalPredictSuccess() {
        Swal.fire({
            icon: "success",
            title: "Diagnóstico generado con éxito",
            text: "Se ha guardado la información en el perfil del paciente.",
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalPredictNotSuccess() {
        Swal.fire({
            icon: "error",
            title: "No se pudo generar el diagnóstico final",
            text: "Intente de nuevo más tarde.",
            customClass: {
                title: 'my-0',
                htmlContainer: 'my-0',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    swalSessionExpired() {
        Swal.fire({
            icon: "error",
            title: "La sesión ha expirado",
            text: "Vuelve a iniciar sesión para continuar",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }
}