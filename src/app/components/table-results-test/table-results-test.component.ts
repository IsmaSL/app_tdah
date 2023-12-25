import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-table-results-test',
    templateUrl: './table-results-test.component.html',
    styleUrls: ['./table-results-test.component.scss']
})
export class TableResultsTestComponent implements OnInit {

    @Input() tests: any[];

    // --
    prob: string;
    diaf: string;

    constructor() { }

    ngOnInit(): void {
        if(localStorage.getItem('report')) {
            const reportJSON = localStorage.getItem('report');
            const report = reportJSON ? JSON.parse(reportJSON) : null;

            this.prob = report ? report.probabilidad : undefined;
            this.diaf = report ? report.diagnosticoFinal : undefined;
        } else {
            this.prob = '';
            this.diaf = '';
        }
    }
}
