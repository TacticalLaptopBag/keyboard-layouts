import { ChangeDetectionStrategy, Component, inject, Inject, Input } from '@angular/core';
import { NavLink } from '../../models/navlink.interface';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, AsyncPipe],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
    @Input()
    public navLinks: NavLink[] = [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Left-handed Dvorak',
            href: '/dvorak-left',
        },
        {
            title: 'Right-handed Dvorak',
            href: '/dvorak-right',
        },
    ]

    public themeSvc = inject(ThemeService)
    public baseUrl = environment.baseUrl
}
