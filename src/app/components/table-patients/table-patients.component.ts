import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-table-patients',
    templateUrl: './table-patients.component.html',
    styleUrls: ['./table-patients.component.scss']
})
export class TablePatientsComponent implements OnInit {

    @Input() patients: any[];

    cfilterClient;
    page = 1;
    pageSize = 2;

    constructor() {
        this.cfilterClient = this.patients;
    }

    ngOnInit() { }

    //complete example................
    cpage = 1;
    cpageSize = 4;

    _csearchTerm: string;
    get csearchTerm(): string {
        return this._csearchTerm;
    }
    set csearchTerm(val: string) {
        this._csearchTerm = val;
        this.cfilterClient = this.cfilter(val);
    }

    cfilter(v: string) {
        return this.patients.filter(x => x.nombre.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
            x.correo.toLowerCase().indexOf(v.toLowerCase()) !== -1);
    }
}
