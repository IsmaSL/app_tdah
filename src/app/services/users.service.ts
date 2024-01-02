import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private url_base = 'http://localhost:8000/users'

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