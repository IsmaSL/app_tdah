import { Component, OnInit} from '@angular/core';
import { TableService } from './table-patients.service';

@Component({
  selector: 'app-table-patients',
  templateUrl: './table-patients.component.html',
  styleUrls: ['./table-patients.component.scss']
})
export class TablePatientsComponent implements OnInit {

  clientList = this.tableService.getTable();
  cfilterClient;
  page = 1;
  pageSize = 2;

  constructor(private tableService: TableService) {
    this.cfilterClient = this.clientList;
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
    return this.tableService.getTable().filter(x => x.Name.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.Contact.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }
}
