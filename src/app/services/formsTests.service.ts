import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FormsTestService {
    private url_base = "http://localhost:8000/forms";

    constructor(private http: HttpClient) { }

    get_score_forms(id: number): Observable<any> {
        return this.http.get<any>(this.url_base + "/get-score-forms/" + id);
    }

    update_score_form(data: any): Observable<any> {
        return this.http.post<any>(this.url_base + "/update-score-form", data);
    }
}