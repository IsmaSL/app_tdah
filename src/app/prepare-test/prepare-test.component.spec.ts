import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareTestComponent } from './prepare-test.component';

describe('PrepareTestComponent', () => {
  let component: PrepareTestComponent;
  let fixture: ComponentFixture<PrepareTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
