import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsrsComponent } from './asrs.component';

describe('AsrsComponent', () => {
  let component: AsrsComponent;
  let fixture: ComponentFixture<AsrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
