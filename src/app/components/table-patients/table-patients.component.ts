import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-table-patients',
    templateUrl: './table-patients.component.html',
    styleUrls: ['./table-patients.component.scss']
})
export class TablePatientsComponent implements OnInit {

    @Input() patients: any[];
    searchText: string = "";
    p: number = 1; 

    constructor() { }

    ngOnInit() { }
}
