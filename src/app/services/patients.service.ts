import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    private url_base = "http://localhost:8000/patients";
    key_lost: string = 'current_patient'

    constructor(private http: HttpClient) { }

    add_patient(patient: any): Observable<any> {
        return this.http.post<any>(this.url_base + '/add-patient', patient);
    }

    get_all_patients(): Observable<any> {
        return this.http.get<any>(this.url_base + '/get-patients');
    }

    get_info_patient(id: string): Observable<any> {
        return this.http.get<any>(this.url_base + '/get-patient-info/' + id);
    }

    set_patient_info(data: any): void {
        try {
            const dataString = JSON.stringify(data);
            localStorage.setItem(this.key_lost, dataString)
        } catch (error) {
            console.log('Error al guardar en localStorage\n', error);
        }
    }

    get_patient_info(): any {
        try {
            const dataString = localStorage.getItem(this.key_lost);
            return dataString ? JSON.parse(dataString) : null;
        }  catch (error) {
            console.error('Error al leer de localStorage\n', error);
            return null;
        }
    }

    delete_patient_info(): void {
        localStorage.removeItem(this.key_lost);
        console.error('Data borrado de localStorage');
    }
}