import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public setItem(key: string, data: string): void {
        localStorage.setItem(key, data);
    }

    public getItem(key: string): string {
        return localStorage.getItem(key);
    }

    public removeItem(key): void {
        localStorage.removeItem(key);
    }

    public clearStorage() {
        localStorage.clear();
    }
}
