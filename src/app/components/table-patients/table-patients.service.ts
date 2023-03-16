import { Injectable } from '@angular/core';
import { Table } from './table-patients';
import { tableList } from './data';

@Injectable()
export class TableService {

    public tableList: Table[] = tableList;

    public getTable() {
        return this.tableList;
    }
}