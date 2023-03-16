import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTdahTestsComponent } from './history-tdah-tests.component';

describe('HistoryTdahTestsComponent', () => {
  let component: HistoryTdahTestsComponent;
  let fixture: ComponentFixture<HistoryTdahTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTdahTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTdahTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
