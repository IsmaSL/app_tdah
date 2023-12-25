export class MuseFormModel {
    idPaciente: number;
    idTipoDispositivo: number;
    detalle_prueba: {
        nivelAtencion: string;
        nivelActividad: string;
        observaciones: string;
        diagnosticoMedico: string;
        justificacionMedico: string;
        urlCsv: string;
    };
    fecha_prueba: string;
    hora_prueba: string;
    tiempo_prueba: string;
    probabilidad: number;
    diagnosticoFinal: string;
}