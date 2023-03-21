import { Device } from "./device";

export const deviceList: Device[] = [
    {
        Id: 123456,
        Status: "Sincronizado",
        Name: "Muse Band 2",
        Description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
        imagePath: 'assets/images/devices/device_1.jpg'
    },
    {
        Id: 234567,
        Status: "No Sincronizado",
        Name: "Muse Band Lite",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagePath: 'assets/images/devices/device_2.jpg'
    },
    {
        Id: 3456678,
        Status: "No Sincronizado",
        Name: "Emotiv Epoc X-14",
        Description: "Praesent commodo cursus magna, vel scelerisque nisl.",
        imagePath: 'assets/images/devices/device_3.png'
    },
];