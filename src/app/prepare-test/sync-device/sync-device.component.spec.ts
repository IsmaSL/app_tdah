import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncDeviceComponent } from './sync-device.component';

describe('SyncDeviceComponent', () => {
  let component: SyncDeviceComponent;
  let fixture: ComponentFixture<SyncDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
