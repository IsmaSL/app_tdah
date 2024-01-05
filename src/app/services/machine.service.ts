import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MachineLearningService {
    private apiBaseUrl = environment.apiBaseUrl;
    private url_base = this.apiBaseUrl + '/machine';

    constructor(private http: HttpClient) { }

    get_predict_diagnosis(data: any): Observable<any> {
        return this.http.post<any>(this.url_base + '/predict/', data)
    }
}