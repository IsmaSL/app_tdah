import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTdahPatientsComponent } from './history-tdah-patients.component';

describe('HistoryTdahPatientsComponent', () => {
  let component: HistoryTdahPatientsComponent;
  let fixture: ComponentFixture<HistoryTdahPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTdahPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTdahPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
