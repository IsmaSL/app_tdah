import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private url_base = 'http://localhost:8000/users'

    constructor(private http: HttpClient) { }

    get_count_patient(): Observable<any> {
        return this.http.get<any>(this.url_base + '/count-patients/');
    }

    
}