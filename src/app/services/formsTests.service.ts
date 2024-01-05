import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FormsTestService {
    private apiBaseUrl = environment.apiBaseUrl;
    private url_base = this.apiBaseUrl + '/forms';

    constructor(private http: HttpClient) { }

    get_score_forms(id: number): Observable<any> {
        return this.http.get<any>(this.url_base + "/get-score-forms/" + id);
    }

    update_score_form(data: any): Observable<any> {
        return this.http.post<any>(this.url_base + "/update-score-form", data);
    }
}