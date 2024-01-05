interface DatosGenerales {
    fechaNacimiento: string;
    sexo: string;
    ciudadResidencia: string;
    numTelefono: string;
    numTelefonoFam: string;
    ocupacion: string;
}

interface DatosClinicos {
    add: number;
    bipolar: number;
    unipolar: number;
    anxiety: number;
    substance: number;
    med: number;
}

export class AddPatientModel {
    urlImg: string;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    rol: string;
    correo: string;
    contraseña: string;
    fechaRegistro: string;
    estado: string;
    datos_generales: DatosGenerales;
    datos_clinicos: DatosClinicos;
}