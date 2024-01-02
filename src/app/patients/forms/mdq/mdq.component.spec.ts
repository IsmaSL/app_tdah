import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdqComponent } from './mdq.component';

describe('MdqComponent', () => {
  let component: MdqComponent;
  let fixture: ComponentFixture<MdqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
