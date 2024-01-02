import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WursComponent } from './wurs.component';

describe('WursComponent', () => {
  let component: WursComponent;
  let fixture: ComponentFixture<WursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
