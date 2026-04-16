import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { environment } from '../environments/environment';

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
export class App {
    public baseUrl = environment.baseUrl
}
