import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private router: Router) {}

    @HostListener('window:popstate', ['$event'])
    onPopState(event: Event) {
        this.router.navigateByUrl('/app/home'); // Cambia '/destination-page' por la ruta de tu página de destino
    }
}
