import { Injectable } from "@angular/core";
import { Device } from "./device";
import { deviceList } from "./data";

@Injectable()
export class DeviceService {
    
    public deviceList: Device[] = deviceList;

    public getDevice() {
        return this.deviceList;
    }
}