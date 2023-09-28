import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseJsComponent } from './muse-js.component';

describe('MuseJsComponent', () => {
  let component: MuseJsComponent;
  let fixture: ComponentFixture<MuseJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuseJsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
