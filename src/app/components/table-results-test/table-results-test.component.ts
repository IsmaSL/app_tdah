import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-table-results-test',
    templateUrl: './table-results-test.component.html',
    styleUrls: ['./table-results-test.component.scss']
})
export class TableResultsTestComponent implements OnInit {

    data: any[] = [];

    constructor() { }

    ngOnInit(): void {
        const localStorageData = localStorage.getItem('listTest');
        this.data = localStorageData ? JSON.parse(localStorageData) : [];

        // console.log(this.data);
        
    }

}
