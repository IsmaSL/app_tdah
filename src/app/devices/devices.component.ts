import { Component } from '@angular/core';
import { DeviceService } from './devices.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {

  deviceList = this.deviceService.getDevice();
  constructor(private deviceService: DeviceService) { }

}
