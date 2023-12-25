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

    swalTestNotSaved(message_error: string) {
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
}