import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    private readonly darkModeKey = 'darkMode';

    getDarkMode(): boolean {
        const darkModeValue = localStorage.getItem(this.darkModeKey);
        return darkModeValue ? JSON.parse(darkModeValue) : false;
    }

    setDarkMode(isDarkMode: boolean): void {
        localStorage.setItem(this.darkModeKey, JSON.stringify(isDarkMode));
    }
}
