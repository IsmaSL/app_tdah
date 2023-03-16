import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResultsTestComponent } from './table-results-test.component';

describe('TableResultsTestComponent', () => {
  let component: TableResultsTestComponent;
  let fixture: ComponentFixture<TableResultsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableResultsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableResultsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
