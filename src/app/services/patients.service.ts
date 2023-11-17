import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private url_base = "http://localhost:8000/users";

    constructor(private http: HttpClient) { }

    get_all_patients(): Observable<any> {
        return this.http.get<any>(this.url_base + '/get-patients');
    }

    get_info_patient(id: string): Observable<any> {
        return this.http.get<any>(this.url_base + '/get-patient-info/' + id);
    }
}