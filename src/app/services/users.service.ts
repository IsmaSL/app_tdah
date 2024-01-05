import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private apiBaseUrl = environment.apiBaseUrl;
    private url_base = this.apiBaseUrl + '/users'

    constructor(private http: HttpClient) { }

    getCurrentUser() {
        return localStorage.getItem('current_user');
    }

    get_count_patient(): Observable<any> {
        return this.http.get<any>(this.url_base + '/count-patients/');
    }

    get_count_patients_adhd(): Observable<any> {
        return this.http.get<any>(this.url_base + '/count-patients-adhd');
    }

    get_history_data(year: number, month: number): Observable<any> {
        return this.http.get<any>(`${this.url_base}/history/${year}/${month}`);
    }

    close_sesion() {
        localStorage.removeItem('current_user');
        localStorage.removeItem('token');
    }
}