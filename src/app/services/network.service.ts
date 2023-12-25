import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    private onlineStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(navigator.onLine);

    constructor() {
        window.addEventListener('online', () => this.actualizarEstadoConexion(true));
        window.addEventListener('offline', () => this.actualizarEstadoConexion(false));
    }

    private actualizarEstadoConexion(estado: boolean): void {
        this.onlineStatus.next(estado);
    }

    get estaOnline(): Observable<boolean> {
        return this.onlineStatus.asObservable();
    }
}
