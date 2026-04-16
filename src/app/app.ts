import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TypingWidget } from "./typing-widget/typing-widget";

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        TypingWidget,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('one-handed-dvorak');
}
