import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private _isDarkTheme = new BehaviorSubject(false)
    public isDarkTheme$ = this._isDarkTheme.asObservable()

    constructor() {
        let darkPreference = localStorage.getItem('dark')
        if(darkPreference == null) {
            // Determine from system
            const mediaMatch = window.matchMedia('(prefers-color-scheme: dark)')
            darkPreference = mediaMatch.matches.toString()
            mediaMatch.addEventListener('change', (e) => {
                this._isDarkTheme.next(e.matches)
            })
        }

        this._isDarkTheme.next(darkPreference?.toLowerCase() === 'true')
    }

    public setDarkTheme(isDark: boolean) {
        this._isDarkTheme.next(isDark)
    }
}
