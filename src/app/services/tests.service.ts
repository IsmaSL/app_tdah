import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MuseFormModel } from '../test/muse-js/muse-js.model';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private url_base = "http://localhost:8000/tests";

    constructor(private http: HttpClient) { } 

    get_all_test_by_patient(id: string): Observable<any> {
        return this.http.get<any>(this.url_base + '/get-tests/' + id);
    }

    get_test_report(id: string): Observable<any> {
        return this.http.get<any>(this.url_base + '/get-report/' + id);
    }

    get_results_eeg(id: string, urlFile: string): Observable<any> {
        const body = { id_user: id, filename: urlFile };
        return this.http.post<any>(this.url_base + "/process-eeg/", body);
    }

    updates_results_report(data: any): Observable<any> {
        return this.http.put<any>(this.url_base + "/update-test-report", data);
    }

    update_atention_report(data: any): Observable<any> {
        return this.http.put<any>(this.url_base + "/updated-test-detail-report", data);
    }

    update_prev_diag_final(data: any): Observable<any> {
        return this.http.put<any>(this.url_base + '/update-test-report', data);
    }

    add_test(data: MuseFormModel): Observable<MuseFormModel> {
        return this.http.post<MuseFormModel>(this.url_base + "/save-test", data);
    }

    get_prev_diag(data: any): Observable<any> {
        return this.http.post<any>(this.url_base + '/calcular-diagnostico', data)
    }
}