import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadViewComponent } from './head-view.component';

describe('HeadViewComponent', () => {
  let component: HeadViewComponent;
  let fixture: ComponentFixture<HeadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
