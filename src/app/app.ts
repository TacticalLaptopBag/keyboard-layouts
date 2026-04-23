import { Component, DOCUMENT, Inject, inject, OnInit, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { environment } from '../environments/environment';
import { ThemeService } from '../services/theme.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        Footer,
        Header
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnInit {
    public baseUrl = environment.baseUrl

    private _renderer = inject(Renderer2)
    private _document = inject(DOCUMENT)
    private _themeSvc = inject(ThemeService)

    ngOnInit(): void {
        this._themeSvc.isDarkTheme$.subscribe((isDarkTheme) => {
            isDarkTheme ?
                this._renderer.addClass(this._document.body, 'dark')
                : this._renderer.removeClass(this._document.body, 'dark')
        })
    }
}
