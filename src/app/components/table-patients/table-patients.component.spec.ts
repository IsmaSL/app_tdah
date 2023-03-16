import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TableService } from './table-patients.service';

import { TablePatientsComponent } from './table-patients.component';

describe('TablePatientsComponent', () => {
  let component: TablePatientsComponent;
  let fixture: ComponentFixture<TablePatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePatientsComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [TableService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
