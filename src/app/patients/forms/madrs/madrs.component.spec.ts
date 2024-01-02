import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadrsComponent } from './madrs.component';

describe('MadrsComponent', () => {
  let component: MadrsComponent;
  let fixture: ComponentFixture<MadrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
