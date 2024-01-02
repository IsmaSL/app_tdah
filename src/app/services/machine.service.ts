import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MachineLearningService {
    private url_base = "http://localhost:8000/machine";

    constructor(private http: HttpClient) { }

    get_predict_diagnosis(data: any): Observable<any> {
        return this.http.post<any>(this.url_base + '/predict/', data)
    }
}